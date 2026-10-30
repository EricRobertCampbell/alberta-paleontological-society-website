import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { eventsForApiRange } from '../../utility/registrationDeadline'

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

        const allEvents = await getCollection('events')
        const eventsData = eventsForApiRange(
            allEvents.map((event) => ({
                id: event.id,
                slug: event.slug,
                data: event.data,
            })),
            startDate,
            endDate
        )

        return new Response(JSON.stringify(eventsData), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
            },
        })
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : String(error)
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
