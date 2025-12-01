import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { splitIsoString } from '../../utility/dates'
import FossilFridayContent from '../../components/FossilFridayContent.astro'

export const GET: APIRoute = async ({ request }) => {
	const url = new URL(request.url)
	const year = url.searchParams.get('year')
	const month = url.searchParams.get('month')
	const day = url.searchParams.get('day')

	// Validate parameters
	if (!year || !month || !day) {
		return new Response(
			JSON.stringify({ error: 'Missing required parameters: year, month, day' }),
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
			JSON.stringify({ error: 'Invalid parameters: year, month, and day must be numbers' }),
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

	// Find entry matching the date
	const matchingEntry = allFossilFridays.find((entry) => {
		const entryParts = splitIsoString(entry.data.date)
		return (
			entryParts.year === yearNum &&
			entryParts.month === monthNum &&
			entryParts.day === dayNum
		)
	})

	if (!matchingEntry) {
		return new Response(
			JSON.stringify(null),
			{
				status: 200,
				headers: {
					'Content-Type': 'application/json',
					'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
				},
			}
		)
	}

	// Render the entry to get the Content component
	const rendered = await matchingEntry.render()
	
	// Render the Content component to HTML using the wrapper component
	const contentResult = await FossilFridayContent.render({ Content: rendered.Content })
	const contentHtml = contentResult.html

	// Return the data
	return new Response(
		JSON.stringify({
			title: matchingEntry.data.title,
			date: matchingEntry.data.date,
			images: matchingEntry.data.images,
			content: contentHtml, // HTML string of the content
		}),
		{
			status: 200,
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
			},
		}
	)
}

