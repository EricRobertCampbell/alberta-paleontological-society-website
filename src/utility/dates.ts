/**
 * Checks whether the initial date (string of the form YYYY-MM-DD) is between (inclusive) the start and end dates
 */
export const isDateBetween = (
    date: string,
    { start, end }: { start: string; end: string }
): boolean => {
    return date >= start && date <= end
}
