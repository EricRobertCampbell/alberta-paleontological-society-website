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

/**
 * Formats a date string (YYYY-MM-DD) into a human-readable format like "December 12, 2025"
 * This function parses the date string directly to avoid timezone issues that occur when
 * using new Date() constructor with date-only strings.
 * 
 * @param dateString - A date string in YYYY-MM-DD format (ISO 8601 date format)
 * @returns A formatted date string like "December 12, 2025"
 */
export const formatDateString = (dateString: string): string => {
    const [datePart] = dateString.split('T') // Handle both date-only and datetime strings
    const [year, month, day] = datePart.split('-')
    
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]
    
    const yearNum = parseInt(year, 10)
    const monthNum = parseInt(month, 10)
    const dayNum = parseInt(day, 10)
    
    // Validate the parsed values
    if (isNaN(yearNum) || isNaN(monthNum) || isNaN(dayNum)) {
        return dateString // Return original string if parsing fails
    }
    
    if (monthNum < 1 || monthNum > 12) {
        return dateString // Return original string if month is invalid
    }
    
    const monthName = monthNames[monthNum - 1]
    return `${monthName} ${dayNum}, ${yearNum}`
}
