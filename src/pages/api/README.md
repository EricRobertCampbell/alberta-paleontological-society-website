# API Routes

This directory contains the API endpoints for the Alberta Paleontological Society website. All endpoints return JSON responses and are available at `/api/{route-name}`.

## Endpoints

### GET `/api/events`

Returns events filtered by date range.

#### Query Parameters

- `start_date` (required): Start date in `YYYY-MM-DD` format
- `end_date` (required): End date in `YYYY-MM-DD` format

#### Validation

- Both `start_date` and `end_date` are required
- Dates must be in `YYYY-MM-DD` format
- `start_date` must be less than or equal to `end_date`

#### Response

Returns an array of events that overlap with the specified date range. Events are sorted by start date (ascending).

Each item is the event's content-collection id plus its frontmatter. Dates are the source values (`start` / `end` as ISO datetimes, or `startDate` / `endDate` as `YYYY-MM-DD` when the event has no time). Optional fields are omitted when empty. `host` is included only when the markdown sets it (it is not defaulted to the Alberta Palaeontological Society). `image` is included as stored, with a site-relative `src`. Talk references are not included. `registrationDeadline` is included when the event sets one. It is either `YYYY-MM-DD` or a datetime with a timezone or offset.

When that deadline's calendar date falls inside the requested range, the array also includes a separate object for the deadline. Its `id` is `{event id}-registration-deadline`, its `title` is `Registration Deadline for {event title}`, and it has `sourceEventId` plus `stablePath` (`/events/stable/{slug}`). A date-only deadline uses `startDate` and `endDate`. A datetime deadline uses `start` and `end`. A range that covers only the event returns the event, including `registrationDeadline`. A range that covers only the deadline returns the deadline object. A range that covers both returns both, ordered by date, with the event before its deadline when the dates are equal.

**Success Response (200):**

```json
[
    {
        "id": "2026-02-05-rtmp-speaker-series-swallowing-stones",
        "title": "Swallowing Stones",
        "subtitle": "Royal Tyrrell Museum Speaker Series 2026",
        "start": "2026-02-05T11:00:00-07:00",
        "end": "2026-02-05T13:00:00-07:00",
        "type": "External",
        "host": "Royal Tyrrell Museum of Palaeontology",
        "location": "Royal Tyrrell Museum's Auditorium (and Zoom)",
        "detailsLink": "https://tyrrellmuseum.com/whats_on/special_events/speaker_series",
        "registrationDeadline": "2026-01-20",
        "image": {
            "src": "/events/2026/example.jpg",
            "alt": "Event poster",
            "attribution": "Photographer Name"
        }
    }
]
```

**Error Responses:**

- `400`: Missing or invalid parameters
- `500`: Server error

#### Example

```
GET /api/events?start_date=2025-04-01&end_date=2025-04-30
```

#### Caching

Responses are cached for 1 hour (`Cache-Control: public, max-age=3600`).

---

### GET `/api/fossil-friday`

Returns Fossil Friday entry data for a specific date.

#### Query Parameters

- `year` (required): Year as a number (e.g., `2025`)
- `month` (required): Month as a number (1-12)
- `day` (required): Day as a number (1-31)

#### Validation

- All three parameters (`year`, `month`, `day`) are required
- Parameters must be valid numbers

#### Response

Returns the Fossil Friday entry matching the specified date, including title, date, and images. If no entry is found, returns an empty object with comparison data for debugging.

**Success Response (200):**

```json
{
  "title": "Edmontosaurus",
  "date": "2025-08-01",
  "images": [
    {
      "src": "/fossilfriday/2025-08-01-edmontosaurus/image.jpg",
      "alt": "Edmontosaurus fossil"
    }
  ],
  "comparisons": [...]
}
```

**Error Responses:**

- `400`: Missing or invalid parameters
- `500`: Server error

#### Example

```
GET /api/fossil-friday?year=2025&month=8&day=1
```

#### Caching

Responses are cached for 1 hour (`Cache-Control: public, max-age=3600`).

---

### GET `/api/fossil-sorting-images`

Returns fossil sorting specimens with pagination and search support.

#### Query Parameters

- `afterId` (optional): Cursor for pagination. Returns the next page of results after the specimen with this ID.
- `q` (optional): Search query string. Searches across specimen ID, description, finder credit, tags, and image descriptions.

#### Pagination

When using `afterId` for pagination:

- Returns up to 20 specimens per page
- Use the `nextCursor` from the response as the `afterId` for the next page
- If `hasMore` is `false`, there are no more results

#### Search

When using the `q` parameter:

- Searches across multiple fields: ID, description, finder credit, tags, and image descriptions
- Returns all matching results (no pagination)
- Case-insensitive search

#### Response

Returns an object containing an array of specimens, pagination information, and search metadata.

**Success Response (200):**

```json
{
    "images": [
        {
            "id": "specimen-001",
            "date": "2025-01-15",
            "description": "Fossil description",
            "finderCredit": "John Doe",
            "tags": ["dinosaur", "jurassic"],
            "thumbnailSrc": "/fossil-sorting-images/thumb.jpg",
            "src": "/fossil-sorting-images/image.jpg",
            "images": [
                {
                    "id": "img-001",
                    "src": "/fossil-sorting-images/image.jpg",
                    "thumbnailSrc": "/fossil-sorting-images/thumb.jpg",
                    "description": "Image description",
                    "credit": "Photographer Name"
                }
            ]
        }
    ],
    "hasMore": true,
    "nextCursor": "specimen-020"
}
```

**When searching (`q` parameter):**

```json
{
  "images": [...],
  "hasMore": false,
  "nextCursor": null
}
```

**Error Responses:**

- `500`: Server error

#### Examples

**Get first page:**

```
GET /api/fossil-sorting-images
```

**Get next page:**

```
GET /api/fossil-sorting-images?afterId=specimen-020
```

**Search:**

```
GET /api/fossil-sorting-images?q=dinosaur
```

#### Caching

Responses are cached for 60 seconds (`Cache-Control: public, max-age=60`).

#### Sorting

Specimens are sorted by:

1. Date (newest first)
2. ID (alphabetically) as a tiebreaker

---

## Response Format

All endpoints return JSON with the following structure:

- **Success**: HTTP 200 with data payload
- **Client Error**: HTTP 400/404 with error message
- **Server Error**: HTTP 500 with error message

Error responses follow this format:

```json
{
    "error": "Error message description"
}
```

## CORS

API endpoints are accessible from the same origin. For cross-origin requests, CORS headers may need to be configured in the Astro configuration.

## Rate Limiting

Currently, there are no rate limits on API endpoints. Consider implementing rate limiting for production use if needed.
