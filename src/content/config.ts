import { defineCollection, z } from "astro:content";

const EVENT_TYPES = [
	"Monthly Meeting",
	"Symposium",
	"Field Trip",
	"Special Joint Meeting of the APS and the CSPG BASS Division",
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

export const collections = {
	events: eventCollection,
};
