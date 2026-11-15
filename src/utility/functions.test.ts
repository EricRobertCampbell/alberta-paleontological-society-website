import { describe, expect, it } from 'vitest'
import {
    edmontonDisplayOffsetMinutes,
    generateEventDateTimeString,
} from './functions'

const UTC6 = -6 * 60
const UTC7 = -7 * 60
const permanentUtc6Start = Date.parse('2026-11-01T08:00:00.000Z')

describe('edmontonDisplayOffsetMinutes', () => {
    it('keeps UTC-6 after Alberta stopped falling back when host zone data still says UTC-7', () => {
        const meeting = Date.parse('2026-11-20T19:30:00-06:00')

        expect(edmontonDisplayOffsetMinutes(meeting, UTC7)).toBe(UTC6)
    })

    it('keeps UTC-6 when host zone data already has the permanent offset', () => {
        const meeting = Date.parse('2026-11-20T19:30:00-06:00')

        expect(edmontonDisplayOffsetMinutes(meeting, UTC6)).toBe(UTC6)
    })

    it('does not rewrite Mountain Standard Time before the clock change', () => {
        const earlierMeeting = Date.parse('2025-11-21T19:30:00-07:00')

        expect(edmontonDisplayOffsetMinutes(earlierMeeting, UTC7)).toBe(UTC7)
    })

    it('starts the correction at 1 November 2026, 02:00', () => {
        expect(edmontonDisplayOffsetMinutes(permanentUtc6Start, UTC7)).toBe(
            UTC6
        )
        expect(
            edmontonDisplayOffsetMinutes(permanentUtc6Start - 1, UTC7)
        ).toBe(UTC7)
    })
})

describe('generateEventDateTimeString', () => {
    it('shows the November 2026 meeting at 7:30 p.m.', () => {
        expect(novemberMeetingHeading()).toBe(
            'Friday, November 20, 2026, 7:30 p.m. - 9:00 p.m.'
        )
    })

    it('shows 7:30 p.m. when host zone data still falls back to UTC-7', () => {
        expect(withStaleEdmontonZoneData(() => novemberMeetingHeading())).toBe(
            'Friday, November 20, 2026, 7:30 p.m. - 9:00 p.m.'
        )
    })

    it('shows a winter 2025 meeting at 7:30 p.m.', () => {
        expect(
            generateEventDateTimeString({
                start: '2025-11-21T19:30:00-07:00',
                end: '2025-11-21T21:00:00-07:00',
                startDate: undefined,
                endDate: undefined,
            })
        ).toBe('Friday, November 21, 2025, 7:30 p.m. - 9:00 p.m.')
    })
})

function novemberMeetingHeading(): string {
    return generateEventDateTimeString({
        start: '2026-11-20T19:30:00-06:00',
        end: '2026-11-20T21:00:00-06:00',
        startDate: undefined,
        endDate: undefined,
    })
}

function withStaleEdmontonZoneData<T>(run: () => T): T {
    const Original = Intl.DateTimeFormat
    const Wrapped = function (
        locales?: Intl.LocalesArgument,
        options?: Intl.DateTimeFormatOptions
    ) {
        const zoneOptions =
            options?.timeZone === 'America/Edmonton'
                ? { ...options, timeZone: 'America/Phoenix' }
                : options
        return new Original(locales, zoneOptions)
    }
    Wrapped.prototype = Original.prototype
    Wrapped.supportedLocalesOf = Original.supportedLocalesOf.bind(Original)
    Intl.DateTimeFormat = Wrapped as typeof Intl.DateTimeFormat
    try {
        return run()
    } finally {
        Intl.DateTimeFormat = Original
    }
}
