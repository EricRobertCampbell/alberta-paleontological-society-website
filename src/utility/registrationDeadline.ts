import type { EventFrontmatter } from '../content/config'
import { formatDateString } from './dates'
import { getEndDate, getStartDate } from './eventSorting'

interface ListedEvent<TContent> {
    id: string
    slug: string
    remarkPluginFrontmatter: EventFrontmatter
    Content?: TContent
}

export interface RegistrationDeadlineListItem<TContent> extends ListedEvent<TContent> {
    anchorId: string
    isRegistrationDeadline: boolean
    sourceSlug: string
    sourceTitle: string
}

interface ApiSourceEvent {
    id: string
    slug: string
    data: EventFrontmatter
}

interface NextEventCandidate {
    isRegistrationDeadline: boolean
    remarkPluginFrontmatter: Pick<EventFrontmatter, 'start' | 'startDate'>
}

const DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})$/
const DATE_TIME =
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?(Z|[+-]\d{2}:\d{2})$/

/**
 * Append a derived registration-deadline entry after each event that has one.
 * The underlying event is unchanged.
 */
export function withRegistrationDeadlines<TContent>(
    events: Array<ListedEvent<TContent>>
): Array<RegistrationDeadlineListItem<TContent>> {
    return events.flatMap((event) => {
        const listed = toListItem(event)
        const deadline = derivedListItem(event)
        return deadline ? [listed, deadline] : [listed]
    })
}

/**
 * The earliest upcoming candidate. When a deadline shares that calendar date
 * with its event, the underlying event wins. Among several events on that
 * date, the last one in the input stays selected.
 */
export function selectNextEvent<T extends NextEventCandidate>(
    events: T[]
): T | undefined {
    if (events.length === 0) {
        return undefined
    }
    const sorted = [...events].sort(compareForNextEventSlot)
    return sorted[sorted.length - 1]
}

/**
 * Events whose dates overlap the range, plus a deadline entry when the
 * deadline's calendar date is inside the range.
 */
export function eventsForApiRange(
    events: ApiSourceEvent[],
    startDate: string,
    endDate: string
): Array<Record<string, unknown>> {
    const selected: Array<Record<string, unknown>> = []

    for (const event of events) {
        if (eventOverlapsRange(event.data, startDate, endDate)) {
            selected.push(toUnderlyingApiEvent(event))
        }
        const deadline = event.data.registrationDeadline
        if (
            deadline &&
            isRegistrationDeadline(deadline) &&
            registrationDeadlineCalendarDate(deadline) >= startDate &&
            registrationDeadlineCalendarDate(deadline) <= endDate
        ) {
            selected.push(toDeadlineApiEvent(event, deadline))
        }
    }

    selected.sort(compareApiEvents)
    return selected
}

export function isRegistrationDeadlineOpen(
    value: string,
    now: Date,
    todayString: string
): boolean {
    if (!isRegistrationDeadline(value)) {
        return false
    }
    if (!value.includes('T')) {
        return todayString <= registrationDeadlineCalendarDate(value)
    }
    const instant = Date.parse(value)
    if (Number.isNaN(instant)) {
        return false
    }
    return now.getTime() <= instant
}

export function formatRegistrationDeadline(value: string): string {
    const dateText = formatDateString(registrationDeadlineCalendarDate(value))
    const timeMatch = value.match(/T(\d{2}):(\d{2})/)
    if (!timeMatch) {
        return dateText
    }
    return `${dateText}, ${formatClock(Number(timeMatch[1]), Number(timeMatch[2]))}`
}

export function registrationDeadlineCalendarDate(value: string): string {
    return value.split('T')[0]
}

export function isRegistrationDeadline(value: string): boolean {
    const dateOnly = value.match(DATE_ONLY)
    if (dateOnly) {
        return isRealCalendarDate(dateOnly[1], dateOnly[2], dateOnly[3])
    }
    const dateTime = value.match(DATE_TIME)
    if (!dateTime) {
        return false
    }
    const [, year, month, day, hour, minute, second, offset] = dateTime
    return (
        isRealCalendarDate(year, month, day) &&
        isRealTime(hour, minute, second) &&
        isValidOffset(offset) &&
        !Number.isNaN(Date.parse(value))
    )
}

export function registrationDeadlineAnchorId(id: string): string {
    return `${id}-registration-deadline`
}

function toListItem<TContent>(
    event: ListedEvent<TContent>
): RegistrationDeadlineListItem<TContent> {
    return {
        ...event,
        anchorId: event.id,
        isRegistrationDeadline: false,
        sourceSlug: event.slug,
        sourceTitle: event.remarkPluginFrontmatter.title,
    }
}

function derivedListItem<TContent>(
    event: ListedEvent<TContent>
): RegistrationDeadlineListItem<TContent> | null {
    const deadline = event.remarkPluginFrontmatter.registrationDeadline
    if (!deadline || !isRegistrationDeadline(deadline)) {
        return null
    }
    const calendarDate = registrationDeadlineCalendarDate(deadline)
    const frontmatter: EventFrontmatter = {
        title: registrationDeadlineTitle(event.remarkPluginFrontmatter.title),
        type: event.remarkPluginFrontmatter.type,
        registrationDeadline: deadline,
    }
    if (event.remarkPluginFrontmatter.host) {
        frontmatter.host = event.remarkPluginFrontmatter.host
    }
    if (deadline.includes('T')) {
        frontmatter.start = deadline
        frontmatter.end = deadline
    } else {
        frontmatter.startDate = calendarDate
        frontmatter.endDate = calendarDate
    }
    return {
        id: event.id,
        slug: event.slug,
        remarkPluginFrontmatter: frontmatter,
        anchorId: registrationDeadlineAnchorId(event.id),
        isRegistrationDeadline: true,
        sourceSlug: event.slug,
        sourceTitle: event.remarkPluginFrontmatter.title,
    }
}

function compareForNextEventSlot(
    a: NextEventCandidate,
    b: NextEventCandidate
): number {
    const byDate = nextEventCalendarDate(b.remarkPluginFrontmatter).localeCompare(
        nextEventCalendarDate(a.remarkPluginFrontmatter)
    )
    if (byDate !== 0) {
        return byDate
    }
    return Number(b.isRegistrationDeadline) - Number(a.isRegistrationDeadline)
}

function nextEventCalendarDate(
    frontmatter: Pick<EventFrontmatter, 'start' | 'startDate'>
): string {
    if (frontmatter.start) {
        return frontmatter.start.split('T')[0]
    }
    if (frontmatter.startDate) {
        return frontmatter.startDate
    }
    return ''
}

function eventOverlapsRange(
    data: EventFrontmatter,
    startDate: string,
    endDate: string
): boolean {
    const eventStartDate = getStartDate(data)
    const eventEndDate = getEndDate(data)
    if (!eventStartDate) {
        return false
    }
    return eventStartDate <= endDate && eventEndDate >= startDate
}

function toUnderlyingApiEvent(event: ApiSourceEvent): Record<string, unknown> {
    const included = [
        'title',
        'subtitle',
        'location',
        'start',
        'end',
        'startDate',
        'endDate',
        'type',
        'host',
        'detailsLink',
        'registrationDeadline',
    ] as const
    const response: Record<string, unknown> = { id: event.id }
    for (const field of included) {
        const value = event.data[field]
        if (field === 'registrationDeadline') {
            if (typeof value === 'string' && isRegistrationDeadline(value)) {
                response[field] = value
            }
            continue
        }
        if (typeof value === 'string' && value !== '') {
            response[field] = value
        }
    }
    if (event.data.image?.src) {
        const image: { src: string; alt: string; attribution?: string } = {
            src: event.data.image.src,
            alt: event.data.image.alt,
        }
        if (event.data.image.attribution) {
            image.attribution = event.data.image.attribution
        }
        response.image = image
    }
    return response
}

function toDeadlineApiEvent(
    event: ApiSourceEvent,
    deadline: string
): Record<string, unknown> {
    const response: Record<string, unknown> = {
        id: registrationDeadlineAnchorId(event.id),
        title: registrationDeadlineTitle(event.data.title),
        type: event.data.type,
        registrationDeadline: deadline,
        sourceEventId: event.id,
        stablePath: `/events/stable/${event.slug}`,
    }
    if (event.data.host) {
        response.host = event.data.host
    }
    if (deadline.includes('T')) {
        response.start = deadline
        response.end = deadline
    } else {
        const calendarDate = registrationDeadlineCalendarDate(deadline)
        response.startDate = calendarDate
        response.endDate = calendarDate
    }
    return response
}

function compareApiEvents(
    a: Record<string, unknown>,
    b: Record<string, unknown>
): number {
    const byDate = apiSortDate(a).localeCompare(apiSortDate(b))
    if (byDate !== 0) {
        return byDate
    }
    return (a.sourceEventId ? 1 : 0) - (b.sourceEventId ? 1 : 0)
}

function apiSortDate(event: Record<string, unknown>): string {
    if (typeof event.startDate === 'string' && event.startDate !== '') {
        return event.startDate
    }
    if (typeof event.start === 'string') {
        return event.start.split('T')[0]
    }
    return ''
}

function registrationDeadlineTitle(title: string): string {
    return `Registration Deadline for ${title}`
}

function isRealCalendarDate(year: string, month: string, day: string): boolean {
    const yearNum = Number(year)
    const monthNum = Number(month)
    const dayNum = Number(day)
    const date = new Date(Date.UTC(yearNum, monthNum - 1, dayNum))
    return (
        date.getUTCFullYear() === yearNum &&
        date.getUTCMonth() === monthNum - 1 &&
        date.getUTCDate() === dayNum
    )
}

function isRealTime(hour: string, minute: string, second: string): boolean {
    const hourNum = Number(hour)
    const minuteNum = Number(minute)
    const secondNum = Number(second)
    return (
        hourNum >= 0 &&
        hourNum <= 23 &&
        minuteNum >= 0 &&
        minuteNum <= 59 &&
        secondNum >= 0 &&
        secondNum <= 59
    )
}

function isValidOffset(offset: string): boolean {
    if (offset === 'Z') {
        return true
    }
    const match = offset.match(/^[+-](\d{2}):(\d{2})$/)
    if (!match) {
        return false
    }
    return Number(match[1]) <= 23 && Number(match[2]) <= 59
}

function formatClock(hour: number, minute: number): string {
    const period = hour >= 12 ? 'p.m.' : 'a.m.'
    const hour12 = hour % 12 === 0 ? 12 : hour % 12
    const minutes = String(minute).padStart(2, '0')
    return `${hour12}:${minutes} ${period}`
}
