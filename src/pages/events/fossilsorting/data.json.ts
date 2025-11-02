import type { APIRoute } from 'astro'
import fs from 'fs'
import path from 'path'

export const GET: APIRoute = async () => {
    // Read the JSON file from the content directory
    const dataFilePath = path.join(
        process.cwd(),
        'src/content/fossilSortingData/fossilSortingData.json'
    )
    const jsonData = fs.readFileSync(dataFilePath, 'utf-8')

    // Pretty print the JSON for better readability
    const prettyJsonData = JSON.stringify(JSON.parse(jsonData), null, 2)

    return new Response(prettyJsonData, {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Content-Disposition':
                'attachment; filename="fossilSortingData.json"',
        },
    })
}
