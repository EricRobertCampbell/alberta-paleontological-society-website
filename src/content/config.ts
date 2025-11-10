import { defineCollection, reference, z } from 'astro:content'
import { file } from 'astro/loaders'

/*
 * Events
 */
const EVENT_TYPES = [
    'Monthly Meeting',
    'Symposium',
    'Field Trip',
    'Special Joint Meeting of the APS and the CSPG BASS Division',
    'Fossil Sorting',
    'External', // e.g. an event hosted by another organization that the APS is promoting
] as const
const isoDateString = z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid ISO date string',
    })

const eventSchema = z.object({
    title: z.string(),
    start: isoDateString.optional(),
    end: isoDateString.optional(),
    // @deprecated
    startDate: z.string().optional(),
    // @deprecated
    endDate: z.string().optional(),
    image: z
        .object({
            src: z.string(),
            alt: z.string(),
            attribution: z.string().optional(),
        })
        .optional(),
    type: z.enum(EVENT_TYPES),
    host: z.string().optional(), // the host of the event, e.g. "Alberta Palaeontological Society". Only include this if host is not the APS.
    detailsLink: z.string().optional(), // a link to more details about the event, e.g. a Google Calendar event or a Facebook event
})

const eventCollection = defineCollection({
    type: 'content',
    schema: eventSchema,
})

export type EventFrontmatter = z.infer<typeof eventSchema>

/*
 * Disclaimers / Privacy Policy
 */
const disclaimersSchema = z.object({
    title: z.string(),
    id: z.string(),
    index: z.number(),
})

const disclaimersCollection = defineCollection({
    type: 'content',
    schema: disclaimersSchema,
})

export type DisclaimersFrontmatter = z.infer<typeof disclaimersSchema>

/*
 * Bulletins and bulletin volumes
 */
// information about a single bulletin
const bulletinsSchema = z.object({
    volume: reference('bulletinVolumes'),
    month: z.string(), // really should be an enum of months
    number: z.number(),
    location: z.string(), // the location for the pdf
})
const bulletinsCollection = defineCollection({
    type: 'data',
    schema: bulletinsSchema,
})

// information about a bulletin volume (basically, one year's worth of bulletins)
const bulletinVolumesSchema = z.object({
    number: z.number(),
    year: z.number(),
})
const bulletinVolumesCollection = defineCollection({
    type: 'data',
    schema: bulletinVolumesSchema,
})

const faqsSchema = z.object({
    question: z.string(),
    order: z.number(),
})
const faqsCollection = defineCollection({
    type: 'content',
    schema: faqsSchema,
})

const announcementSchema = z.object({
    title: z.string(),
    startDate: z.string(),
    endDate: z.string(),
})
const announcementCollection = defineCollection({
    type: 'content',
    schema: announcementSchema,
})
export type AnnouncementFrontmatter = z.infer<typeof announcementSchema>

const fossilSortingImageSchema = z.object({
    id: z.string(),
    date: isoDateString,
    src: z.string(),
    thumbnailSrc: z.string(),
    description: z.string(),
    finderCredit: z.string(),
    photoCredit: z.string(),
    tags: z.array(z.string()).default([]),
})
const fossilSortingImagesCollection = defineCollection({
    loader: file('src/content/fossilSortingImages/images.json'),
    schema: fossilSortingImageSchema,
})
export type FossilSortingImage = z.infer<typeof fossilSortingImageSchema>

const FossilCollection = defineCollection({
    type: 'data',
    schema: z.object({
        // NB the accession number is the id (name of the file) - it will appear as the id
        description: z.string(), // a description of the fossil
        identification: z.string().optional(), // the identification of the fossil
        formation: z.string().optional(), // the formation the fossil was found in
        timespan: z.string().optional(), // the timespan the fossil is from
        locality: z.string().optional(), // the locality the fossil was found in
        threeDScans: z
            .array(
                z.object({
                    filename: z.string(),
                    attribution: z.string(),
                })
            )
            .optional(),
    }),
})

const FossilSortingDataCollection = defineCollection({
    loader: file('src/content/fossilSortingData/fossilSortingData.json'),
    schema: z.object({
        date: z.string(), // a string representing the date
        jars: z.array(
            // information on each individual jar. This includes (sometimes) both the sorted and unsorted jars
            z.object({
                id: z.string().optional(),
                initialWeightGrams: z.number().optional(),
                finalWeightGrams: z.number().optional(),
            })
        ),
        sessionDurationMinutes: z.number().optional(), // the total duration of the session
        totalPeople: z.number().optional(), // total people who were sorting
        totalTakenBeforeMeasurement: z.number().optional(), // Number of people who took a bunch of the matrix before I got to measure the jars
        notes: z.string().optional(), // any additional notes about this session
    }),
})

export const collections = {
    events: eventCollection,
    disclaimers: disclaimersCollection,
    bulletins: bulletinsCollection,
    bulletinVolumes: bulletinVolumesCollection,
    faqs: faqsCollection,
    announcements: announcementCollection,
    fossilSortingImages: fossilSortingImagesCollection,
    fossils: FossilCollection,
    fossilSortingData: FossilSortingDataCollection,
}
