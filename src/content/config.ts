import { defineCollection, reference, z } from "astro:content";

/*
 * Events
 */
const EVENT_TYPES = [
	"Monthly Meeting",
	"Symposium",
	"Field Trip",
	"Special Joint Meeting of the APS and the CSPG BASS Division",
	"Fossil Sorting",
] as const;
const eventSchema = z.object({
	title: z.string(),
	startDate: z.string(),
	startTime: z.string().optional(),
	endDate: z.string().optional(),
	endTime: z.string().optional(),
	image: z
		.object({
			src: z.string(),
			alt: z.string(),
			attribution: z.string().optional(),
		})
		.optional(),
	type: z.enum(EVENT_TYPES),
});

const eventCollection = defineCollection({
	type: "content",
	schema: eventSchema,
});

export type EventFrontmatter = z.infer<typeof eventSchema>;

/*
 * Disclaimers / Privacy Policy
 */
const disclaimersSchema = z.object({
	title: z.string(),
	id: z.string(),
	index: z.number(),
});

const disclaimersCollection = defineCollection({
	type: "content",
	schema: disclaimersSchema,
});

export type DisclaimersFrontmatter = z.infer<typeof disclaimersSchema>;

/*
 * Bulletins and bulletin volumes
 */
// information about a single bulletin
const bulletinsSchema = z.object({
	volume: reference("bulletinVolumes"),
	month: z.string(), // really should be an enum of months
	number: z.number(),
	location: z.string(), // the location for the pdf
});
const bulletinsCollection = defineCollection({
	type: "data",
	schema: bulletinsSchema,
});

// information about a bulletin volume (basically, one year's worth of bulletins)
const bulletinVolumesSchema = z.object({
	number: z.number(),
	year: z.number(),
});
const bulletinVolumesCollection = defineCollection({
	type: "data",
	schema: bulletinVolumesSchema,
});

const faqsSchema = z.object({
	question: z.string(),
	order: z.number(),
});
const faqsCollection = defineCollection({
	type: "content",
	schema: faqsSchema,
});

const announcementSchema = z.object({
	title: z.string(),
	startDate: z.string(),
	endDate: z.string(),
});
const announcementCollection = defineCollection({
	type: "content",
	schema: announcementSchema,
});
export type AnnouncementFrontmatter = z.infer<typeof announcementSchema>;

export const collections = {
	events: eventCollection,
	disclaimers: disclaimersCollection,
	bulletins: bulletinsCollection,
	bulletinVolumes: bulletinVolumesCollection,
	faqs: faqsCollection,
	announcements: announcementCollection,
};
