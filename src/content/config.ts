import { defineCollection, z } from "astro:content";

const eventCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		startDate: z.string(),
		startTime: z.string().optional(),
		endDate: z.string().optional(),
		endTime: z.string().optional(),
	}),
});

export const collections = {
	events: eventCollection,
};
