const DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})$/
const DATE_TIME =
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?(Z|[+-]\d{2}:\d{2})$/

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
