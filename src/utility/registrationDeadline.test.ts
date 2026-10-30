import { describe, expect, it } from 'vitest'
import {
    eventsForApiRange,
    formatRegistrationDeadline,
    isRegistrationDeadline,
    isRegistrationDeadlineOpen,
    registrationDeadlineCalendarDate,
    selectNextEvent,
    withRegistrationDeadlines,
} from './registrationDeadline'

describe('isRegistrationDeadline', () => {
    it('accepts a calendar date', () => {
        expect(isRegistrationDeadline('2026-10-11')).toBe(true)
    })

    it('accepts a datetime with an offset or Z', () => {
        expect(isRegistrationDeadline('2026-10-11T17:00:00-06:00')).toBe(true)
        expect(isRegistrationDeadline('2026-10-12T05:30:00Z')).toBe(true)
    })

    it('rejects a zoneless datetime, an impossible day, and an empty string', () => {
        expect(isRegistrationDeadline('2026-10-11T17:00:00')).toBe(false)
        expect(isRegistrationDeadline('2026-02-31')).toBe(false)
        expect(isRegistrationDeadline('')).toBe(false)
    })
})

describe('registrationDeadlineCalendarDate', () => {
    it('uses the date prefix for a late-evening offset', () => {
        expect(
            registrationDeadlineCalendarDate('2026-10-11T23:30:00-06:00')
        ).toBe('2026-10-11')
    })

    it('uses the date prefix for Z instead of converting timezones', () => {
        expect(registrationDeadlineCalendarDate('2026-10-12T05:30:00Z')).toBe(
            '2026-10-12'
        )
    })
})

describe('formatRegistrationDeadline', () => {
    it('formats a date without inventing a clock time', () => {
        expect(formatRegistrationDeadline('2026-10-11')).toBe('October 11, 2026')
    })

    it('formats a datetime from the clock time in the string', () => {
        expect(formatRegistrationDeadline('2026-10-11T17:00:00-06:00')).toBe(
            'October 11, 2026, 5:00 p.m.'
        )
    })
})

describe('isRegistrationDeadlineOpen', () => {
    const now = new Date('2026-10-11T18:00:00-06:00')

    it('stays open through a date-only deadline and closes the next day', () => {
        expect(isRegistrationDeadlineOpen('2026-10-11', now, '2026-10-11')).toBe(
            true
        )
        expect(isRegistrationDeadlineOpen('2026-10-11', now, '2026-10-12')).toBe(
            false
        )
    })

    it('closes a datetime after that instant and stays open before it', () => {
        expect(
            isRegistrationDeadlineOpen(
                '2026-10-11T17:00:00-06:00',
                now,
                '2026-10-11'
            )
        ).toBe(false)
        expect(
            isRegistrationDeadlineOpen(
                '2026-10-11T19:00:00-06:00',
                now,
                '2026-10-11'
            )
        ).toBe(true)
    })
})

describe('withRegistrationDeadlines', () => {
    const event = {
        id: '2026-11-13-sleepover',
        slug: '2026-11-13-sleepover',
        remarkPluginFrontmatter: {
            title: 'Dinovember Sleepover',
            type: 'Field Trip',
            host: 'Royal Tyrrell Museum of Palaeontology',
            start: '2026-11-13T18:30:00-07:00',
            end: '2026-11-14T10:00:00-07:00',
            location: 'Drumheller',
            image: { src: '/poster.png', alt: 'Poster' },
            registrationDeadline: '2026-10-11',
        },
        Content: 'body',
    }

    it('appends a deadline entry and leaves the underlying event dates alone', () => {
        const items = withRegistrationDeadlines([event])

        expect(items).toHaveLength(2)
        expect(items[0].remarkPluginFrontmatter.start).toBe(
            '2026-11-13T18:30:00-07:00'
        )
        expect(items[0].isRegistrationDeadline).toBe(false)

        const deadline = items[1]
        expect(deadline.isRegistrationDeadline).toBe(true)
        expect(deadline.anchorId).toBe(
            '2026-11-13-sleepover-registration-deadline'
        )
        expect(deadline.sourceSlug).toBe('2026-11-13-sleepover')
        expect(deadline.sourceTitle).toBe('Dinovember Sleepover')
        expect(deadline.remarkPluginFrontmatter.title).toBe(
            'Registration Deadline for Dinovember Sleepover'
        )
        expect(deadline.remarkPluginFrontmatter.startDate).toBe('2026-10-11')
        expect(deadline.remarkPluginFrontmatter.endDate).toBe('2026-10-11')
        expect(deadline.remarkPluginFrontmatter.start).toBeUndefined()
        expect(deadline.remarkPluginFrontmatter.image).toBeUndefined()
        expect(deadline.remarkPluginFrontmatter.location).toBeUndefined()
        expect(deadline.remarkPluginFrontmatter.host).toBe(
            'Royal Tyrrell Museum of Palaeontology'
        )
        expect(deadline.remarkPluginFrontmatter.type).toBe('Field Trip')
    })

    it('stores a datetime deadline as start and end only', () => {
        const items = withRegistrationDeadlines([
            {
                ...event,
                remarkPluginFrontmatter: {
                    ...event.remarkPluginFrontmatter,
                    registrationDeadline: '2026-10-11T17:00:00-06:00',
                },
            },
        ])
        const deadline = items[1].remarkPluginFrontmatter
        expect(deadline.start).toBe('2026-10-11T17:00:00-06:00')
        expect(deadline.end).toBe('2026-10-11T17:00:00-06:00')
        expect(deadline.startDate).toBeUndefined()
    })

    it('leaves an event with no deadline unchanged', () => {
        const plain = {
            ...event,
            remarkPluginFrontmatter: {
                ...event.remarkPluginFrontmatter,
                registrationDeadline: undefined,
            },
        }
        expect(withRegistrationDeadlines([plain])).toEqual([
            expect.objectContaining({
                isRegistrationDeadline: false,
                anchorId: '2026-11-13-sleepover',
            }),
        ])
        expect(withRegistrationDeadlines([plain])).toHaveLength(1)
    })
})

describe('selectNextEvent', () => {
    it('prefers the underlying event when it shares a day with its deadline', () => {
        const items = withRegistrationDeadlines([
            {
                id: 'meeting',
                slug: 'meeting',
                remarkPluginFrontmatter: {
                    title: 'October Meeting',
                    type: 'Monthly Meeting',
                    start: '2026-10-16T19:30:00-06:00',
                    end: '2026-10-16T21:00:00-06:00',
                    registrationDeadline: '2026-10-16',
                },
            },
        ])

        expect(selectNextEvent(items)?.isRegistrationDeadline).toBe(false)
        expect(selectNextEvent(items)?.remarkPluginFrontmatter.title).toBe(
            'October Meeting'
        )
    })

    it('selects an earlier deadline over a later event', () => {
        const items = withRegistrationDeadlines([
            {
                id: 'sleepover',
                slug: 'sleepover',
                remarkPluginFrontmatter: {
                    title: 'Dinovember Sleepover',
                    type: 'Field Trip',
                    start: '2026-11-13T18:30:00-07:00',
                    end: '2026-11-14T10:00:00-07:00',
                    registrationDeadline: '2026-10-11',
                },
            },
        ])

        expect(selectNextEvent(items)?.isRegistrationDeadline).toBe(true)
    })

    it('keeps the last underlying event when several share the earliest day', () => {
        const selected = selectNextEvent([
            {
                isRegistrationDeadline: false,
                remarkPluginFrontmatter: {
                    title: 'Morning',
                    startDate: '2026-10-16',
                },
            },
            {
                isRegistrationDeadline: false,
                remarkPluginFrontmatter: {
                    title: 'Evening',
                    startDate: '2026-10-16',
                },
            },
        ])

        expect(selected?.remarkPluginFrontmatter.title).toBe('Evening')
    })
})

describe('eventsForApiRange', () => {
    const sleepover = {
        id: '2026-11-13-sleepover',
        slug: '2026-11-13-sleepover',
        data: {
            title: 'Dinovember Sleepover',
            type: 'Field Trip',
            start: '2026-11-13T18:30:00-07:00',
            end: '2026-11-14T10:00:00-07:00',
            location: 'Drumheller',
            registrationDeadline: '2026-10-11',
        },
    }

    it('returns the event and its deadline when the range covers only the event', () => {
        const result = eventsForApiRange(
            [sleepover],
            '2026-11-01',
            '2026-11-30'
        )
        expect(result).toHaveLength(1)
        expect(result[0]).toMatchObject({
            id: '2026-11-13-sleepover',
            title: 'Dinovember Sleepover',
            registrationDeadline: '2026-10-11',
            location: 'Drumheller',
        })
    })

    it('returns only the deadline event when the range covers the deadline', () => {
        const result = eventsForApiRange(
            [sleepover],
            '2026-10-01',
            '2026-10-31'
        )
        expect(result).toEqual([
            {
                id: '2026-11-13-sleepover-registration-deadline',
                title: 'Registration Deadline for Dinovember Sleepover',
                type: 'Field Trip',
                startDate: '2026-10-11',
                endDate: '2026-10-11',
                registrationDeadline: '2026-10-11',
                sourceEventId: '2026-11-13-sleepover',
                stablePath: '/events/stable/2026-11-13-sleepover',
            },
        ])
    })

    it('returns both when the range covers both dates, earlier date first', () => {
        const result = eventsForApiRange(
            [sleepover],
            '2026-10-01',
            '2026-11-30'
        )
        expect(result.map((item) => item.id)).toEqual([
            '2026-11-13-sleepover-registration-deadline',
            '2026-11-13-sleepover',
        ])
    })

    it('lists the underlying event before the deadline when they share a day', () => {
        const result = eventsForApiRange(
            [
                {
                    id: 'meeting',
                    slug: 'meeting',
                    data: {
                        title: 'Meeting',
                        type: 'Monthly Meeting',
                        startDate: '2026-10-11',
                        endDate: '2026-10-11',
                        registrationDeadline: '2026-10-11',
                    },
                },
            ],
            '2026-10-01',
            '2026-10-31'
        )
        expect(result.map((item) => item.id)).toEqual([
            'meeting',
            'meeting-registration-deadline',
        ])
    })

    it('returns a deadline for an undated event and omits the event itself', () => {
        const result = eventsForApiRange(
            [
                {
                    id: 'undated',
                    slug: 'undated',
                    data: {
                        title: 'Workshop',
                        type: 'External',
                        registrationDeadline: '2026-10-11T17:00:00-06:00',
                    },
                },
            ],
            '2026-10-11',
            '2026-10-11'
        )
        expect(result).toEqual([
            {
                id: 'undated-registration-deadline',
                title: 'Registration Deadline for Workshop',
                type: 'External',
                start: '2026-10-11T17:00:00-06:00',
                end: '2026-10-11T17:00:00-06:00',
                registrationDeadline: '2026-10-11T17:00:00-06:00',
                sourceEventId: 'undated',
                stablePath: '/events/stable/undated',
            },
        ])
    })
})
