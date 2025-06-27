/**
 * Checks whether the initial date (string of the form YYYY-MM-DD) is between (inclusive) the start and end dates
 */
export const isDateBetween = (
    date: string,
    { start, end }: { start: string; end: string }
): boolean => {
    return date >= start && date <= end
}

export const splitIsoString = (s: string) => {
    const [datePart] = s.split('T')
    const [year, month, day] = datePart.split('-')
    return {
        year: parseInt(year),
        month: parseInt(month),
        day: parseInt(day),
        date: datePart,
    }
}
