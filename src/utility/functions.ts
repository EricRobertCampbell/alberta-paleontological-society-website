import type { EventFrontmatter } from '../content/config'

/**
 * https://stackoverflow.com/questions/39223481/incorrect-date-shown-in-new-date-in-javascript
 */
const convertDateToUTC = (date: Date): Date => {
    return new Date(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds()
    )
}
const convertDateString = (dateString: string): string => {
    const locale = 'en-CA'
    const options: Intl.DateTimeFormatOptions = {
        dateStyle: 'full',
        timeZone: 'America/Edmonton',
    }
    // const baseDate = new Date(dateString);
    // const realDate = new Date(
    // 	baseDate.getTime() + baseDate.getTimezoneOffset() * 60 * 1000
    // );
    const realDate = new Date(`${dateString}T00:00:00-07:00`)
    return realDate.toLocaleString(locale, options)

    // return convertDateToUTC(new Date(dateString + "T00:00")).toLocaleDateString(
    // 	locale,
    // 	options
    // );
}

/**
 * Formats a date string into a human-readable string using the 'en-CA' locale
 * and the 'America/Edmonton' time zone. Optionally includes the time.
 *
 * @param date - A date string (e.g., ISO format) to be formatted.
 * @param options - Optional configuration object.
 * @param options.time - Whether to include the time in the output. Defaults to true.
 * @returns A formatted date string.
 */
const dateToDisplayFormat = (
    date: string,
    options: { time?: boolean; date?: boolean } = { time: true, date: true }
): string => {
    const locale = 'en-CA'
    const showTime = options.time ?? true
    const showDate = options.date ?? true
    const parsedDate = new Date(date)

    const datePart = parsedDate.toLocaleDateString(locale, {
        dateStyle: 'full',
        timeZone: 'America/Edmonton',
    })

    const timePart = parsedDate.toLocaleTimeString(locale, {
        timeStyle: 'short',
        timeZone: 'America/Edmonton',
    })

    if (!showTime) {
        return datePart
    }
    if (!showDate) {
        return timePart
    }

    return `${datePart}, ${timePart}`
}

interface EventDateTimeStringParams {
    start: EventFrontmatter['start']
    end: EventFrontmatter['end']
    startDate: EventFrontmatter['startDate']
    startTime: EventFrontmatter['startTime']
    endDate: EventFrontmatter['endDate']
    endTime: EventFrontmatter['endTime']
}
export const generateEventDateTimeString = ({
    start,
    end,
    startDate,
    startTime,
    endDate,
    endTime,
}: EventDateTimeStringParams): string => {
    let startString: string = ''
    let endString: string = ''
    if (start || end) {
        if (start) {
            startString = dateToDisplayFormat(start)
        }
        if (end) {
            const sameDate = start
                ? start.toISOString().split('T')[0] ===
                  end.toISOString().split('T')[0]
                : false // if there's no start, we can't compare dates
            endString = dateToDisplayFormat(end, { date: !sameDate })
        }
    } else {
        if (startDate === endDate || (startDate && !endDate)) {
            startString = convertDateString(startDate)
        } else if (endDate) {
            startString = convertDateString(startDate)
            endString = convertDateString(endDate)
        }

        if (startTime) {
            startString = `${startString} ${startTime}`
        }
        if (endTime) {
            endString = `${endString} ${endTime}`
        }
    }
    return (endString ? `${startString} - ${endString}` : startString).replace(
        /\s+/g,
        ' '
    )
}

export const pathMatchesDestination = (path: string, destination: string) => {
    // split into segments
    const pathSegments = path.split('/').filter((segment) => !!segment)
    const destinationSegments = destination
        .split('/')
        .filter((segment) => !!segment)

    //console.log({ pathSegments, destinationSegments });

    if (destinationSegments.length === 0) {
        return pathSegments.length === 0
    }
    if (destinationSegments.length > pathSegments.length) {
        return false
    }
    if (
        destinationSegments.length <= pathSegments.length &&
        destinationSegments.every(
            (destinationSegment, index) =>
                destinationSegment === pathSegments[index]
        )
    ) {
        return true
    }

    return false
}

/**
 * Get the YYYY-MM-DD string corresponding to today's date
 */
export const getTodayString = () => {
    const today = new Date()
    const offset = today.getTimezoneOffset()
    const todayWithOffset = new Date(today.getTime() - offset * 60 * 1000)
    const todayString = todayWithOffset.toISOString().split('T')[0]
    return todayString
}

// https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
export const formatDate = (date?: string) => {
    let d: Date
    if (date) {
        d = new Date(date)
    } else {
        d = new Date()
    }
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate()
    const year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
}
