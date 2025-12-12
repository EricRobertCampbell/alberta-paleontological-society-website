import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { splitIsoString } from '../../utility/dates'
import FossilFridayContent from '../../components/FossilFridayContent.astro'

export const GET: APIRoute = async ({ request }) => {
	try {
		const url = new URL(request.url)
		const year = url.searchParams.get('year')
		const month = url.searchParams.get('month')
		const day = url.searchParams.get('day')

		// Validate parameters
		if (!year || !month || !day) {
			return new Response(
				JSON.stringify({
					error: 'Missing required parameters: year, month, day',
				}),
				{
					status: 400,
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
		}

		// Validate that year, month, day are valid numbers
		const yearNum = parseInt(year, 10)
		const monthNum = parseInt(month, 10)
		const dayNum = parseInt(day, 10)

		if (isNaN(yearNum) || isNaN(monthNum) || isNaN(dayNum)) {
			return new Response(
				JSON.stringify({
					error: 'Invalid parameters: year, month, and day must be numbers',
				}),
				{
					status: 400,
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
		}

		// Get all FossilFriday entries
		const allFossilFridays = await getCollection('fossilFriday')

		// Build comparisons array for debugging
		const comparisons = allFossilFridays.map((entry) => {
			const entryParts = splitIsoString(entry.data.date)
			const isMatch = (
				entryParts.year === yearNum &&
				entryParts.month === monthNum &&
				entryParts.day === dayNum
			)
			
			return {
				queryParams: {
					year: yearNum,
					month: monthNum,
					day: dayNum,
				},
				entryDate: {
					original: entry.data.date,
					parsed: {
						year: entryParts.year,
						month: entryParts.month,
						day: entryParts.day,
					},
				},
				match: isMatch,
			}
		})

		// Find entry matching the date
		// Note: Both entryParts (from splitIsoString) and yearNum/monthNum/dayNum are integers,
		// so the comparison will work correctly (e.g., 5 === 5, not "05" === 5)
		const matchingEntry = allFossilFridays.find((entry) => {
			const entryParts = splitIsoString(entry.data.date)
			return (
				entryParts.year === yearNum &&
				entryParts.month === monthNum &&
				entryParts.day === dayNum
			)
		})

		if (!matchingEntry) {
			return new Response(JSON.stringify({
				comparisons: comparisons,
			}), {
				status: 200,
				headers: {
					'Content-Type': 'application/json',
					'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
				},
			})
		}

		// Render the entry to get the Content component
		const rendered = await matchingEntry.render()
		console.log({ rendered })

		// Render the Content component to HTML using the wrapper component
		const contentResult = await FossilFridayContent.render({
			Content: rendered.Content,
		})
		const contentHtml = contentResult.html

		// Return the data
		return new Response(
			JSON.stringify({
				title: matchingEntry.data.title,
				date: matchingEntry.data.date,
				images: matchingEntry.data.images,
				content: contentHtml, // HTML string of the content
				comparisons: comparisons,
			}),
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
