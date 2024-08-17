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
export const generateEventDateTimeString = (
    startDate: EventFrontmatter['startDate'],
    startTime: EventFrontmatter['startTime'],
    endDate: EventFrontmatter['endDate'],
    endTime: EventFrontmatter['endTime']
): string => {
    let start: string = ''
    let end: string = ''
    if (startDate === endDate || (startDate && !endDate)) {
        start = convertDateString(startDate)
    } else if (endDate) {
        start = convertDateString(startDate)
        end = convertDateString(endDate)
    }

    if (startTime) {
        start = `${start} ${startTime}`
    }
    if (endTime) {
        end = `${end} ${endTime}`
    }
    return (end ? `${start} - ${end}` : start).replace(/\s+/g, ' ')
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
