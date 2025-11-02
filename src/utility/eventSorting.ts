import type { EventFrontmatter } from '../content/config'

export interface RenderedEvent {
    remarkPluginFrontmatter: any
    Content: any
    headings: any[]
    [key: string]: any
}

export interface EventsSortResult {
    upcomingEvents: any[]
    pastEvents: any[]
}

/**
 * Helper function to get end date from event frontmatter
 */
export const getEndDate = (frontmatter: any): string => {
    // Check for explicit end date first
    if (frontmatter.endDate) {
        return frontmatter.endDate
    }
    // Extract date from ISO datetime string
    if (frontmatter.end) {
        return frontmatter.end.split('T')[0]
    }
    // Fall back to start date if no end date (single-day event)
    if (frontmatter.startDate) {
        return frontmatter.startDate
    }
    if (frontmatter.start) {
        return frontmatter.start.split('T')[0]
    }
    return ''
}

/**
 * Helper function to get start date from event frontmatter
 */
export const getStartDate = (frontmatter: any): string => {
    if (frontmatter.startDate) {
        return frontmatter.startDate
    }
    if (frontmatter.start) {
        return frontmatter.start.split('T')[0]
    }
    return ''
}

/**
 * Generator function that creates event sorting functions based on sort order
 * @param ascending - true for ascending (earliest first), false for descending (latest first)
 * @returns A sorting function for events
 */
const sortEventsGenerator = (ascending: boolean) => {
    return (e1: any, e2: any): number => {
        const start1 = getStartDate(e1.remarkPluginFrontmatter)
        const start2 = getStartDate(e2.remarkPluginFrontmatter)
        if (!start1 || !start2) {
            return 0
        }
        return ascending
            ? start1.localeCompare(start2)
            : start2.localeCompare(start1)
    }
}

/**
 * Sort events in ascending chronological order (earliest first)
 */
export const sortEventsAsc = sortEventsGenerator(true)

/**
 * Sort events in descending chronological order (latest first)
 */
export const sortEventsDesc = sortEventsGenerator(false)

/**
 * Sort events into past and upcoming based on current date
 */
export const sortEventsByDate = (events: any[]): EventsSortResult => {
    // Get current date for server-side filtering
    const today = new Date()
    const offset = today.getTimezoneOffset()
    const todayWithOffset = new Date(today.getTime() - offset * 60 * 1000)
    const todayString = todayWithOffset.toISOString().split('T')[0]

    const upcomingEvents: any[] = []
    const pastEvents: any[] = []

    // Separate events into past and upcoming in a single loop
    events.forEach((event) => {
        const endDate = getEndDate(event.remarkPluginFrontmatter)
        if (endDate >= todayString) {
            upcomingEvents.push(event)
        } else {
            pastEvents.push(event)
        }
    })

    // Sort using the generated sorting functions
    upcomingEvents.sort(sortEventsAsc) // Upcoming: earliest first
    pastEvents.sort(sortEventsDesc) // Past: most recent first

    return {
        upcomingEvents,
        pastEvents,
    }
}
