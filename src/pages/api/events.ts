import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { getStartDate, getEndDate } from '../../utility/eventSorting'
import { generateEventDateTimeString } from '../../utility/functions'

export const GET: APIRoute = async ({ request }) => {
	try {
		const url = new URL(request.url)
		const startDate = url.searchParams.get('start_date')
		const endDate = url.searchParams.get('end_date')

		// Validate parameters
		if (!startDate || !endDate) {
			return new Response(
				JSON.stringify({
					error: 'Missing required parameters: start_date and end_date (format: YYYY-MM-DD)',
				}),
				{
					status: 400,
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
		}

		// Validate date format (YYYY-MM-DD)
		const dateRegex = /^\d{4}-\d{2}-\d{2}$/
		if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
			return new Response(
				JSON.stringify({
					error: 'Invalid date format. Dates must be in YYYY-MM-DD format',
				}),
				{
					status: 400,
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
		}

		// Validate that start_date <= end_date
		if (startDate > endDate) {
			return new Response(
				JSON.stringify({
					error: 'start_date must be less than or equal to end_date',
				}),
				{
					status: 400,
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
		}

		// Get all events
		const allEvents = await getCollection('events')

		// Filter events that overlap with the date range
		// An event overlaps if:
		// - Event end date >= start_date (event ends on or after the start date)
		// - Event start date <= end_date (event starts on or before the end date)
		const filteredEvents = allEvents.filter((event) => {
			const eventStartDate = getStartDate(event.data)
			const eventEndDate = getEndDate(event.data)

			// Skip events without valid dates
			if (!eventStartDate) {
				return false
			}

			// Event overlaps if it starts before or on the end_date and ends on or after the start_date
			return eventStartDate <= endDate && eventEndDate >= startDate
		})

		// Sort events by start date (ascending)
		const sortedEvents = [...filteredEvents].sort((a, b) => {
			const dateA = getStartDate(a.data)
			const dateB = getStartDate(b.data)
			return dateA.localeCompare(dateB)
		})

		// Transform events to the required format
		const eventsData = sortedEvents.map((event) => {
			const { title, subtitle, location, type, host, start, end, startDate, endDate } = event.data

			// Generate human-readable date string
			const dateString = generateEventDateTimeString({
				start,
				end,
				startDate,
				endDate,
			})

			return {
				title: title,
				subtitle: subtitle || '',
				date: dateString,
				host: host || 'Alberta Palaeontological Society',
				location: location || '',
			}
		})

		return new Response(
			JSON.stringify(eventsData),
			{
				status: 200,
				headers: {
					'Content-Type': 'application/json',
					'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
				},
			}
		)
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error)
		return new Response(
			JSON.stringify({
				error: errorMessage,
			}),
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
	}
}

