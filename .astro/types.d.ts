declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof AnyEntryMap> = AnyEntryMap[C][keyof AnyEntryMap[C]];

	// TODO: Remove this when having this fallback is no longer relevant. 2.3? 3.0? - erika, 2023-04-04
	/**
	 * @deprecated
	 * `astro:content` no longer provide `image()`.
	 *
	 * Please use it through `schema`, like such:
	 * ```ts
	 * import { defineCollection, z } from "astro:content";
	 *
	 * defineCollection({
	 *   schema: ({ image }) =>
	 *     z.object({
	 *       image: image(),
	 *     }),
	 * });
	 * ```
	 */
	export const image: never;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {})
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {})
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
			  }
			: {
					collection: C;
					id: keyof DataEntryMap[C];
			  }
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"announcements": {
"2023-09-symposium-announcement.md": {
	id: "2023-09-symposium-announcement.md";
  slug: "2023-09-symposium-announcement";
  body: string;
  collection: "announcements";
  data: InferEntrySchema<"announcements">
} & { render(): Render[".md"] };
"2023-11-social.md": {
	id: "2023-11-social.md";
  slug: "2023-11-social";
  body: string;
  collection: "announcements";
  data: InferEntrySchema<"announcements">
} & { render(): Render[".md"] };
"2023-12-circular-1-announcement.md": {
	id: "2023-12-circular-1-announcement.md";
  slug: "2023-12-circular-1-announcement";
  body: string;
  collection: "announcements";
  data: InferEntrySchema<"announcements">
} & { render(): Render[".md"] };
"2023-12-new-youtube-channel.md": {
	id: "2023-12-new-youtube-channel.md";
  slug: "2023-12-new-youtube-channel";
  body: string;
  collection: "announcements";
  data: InferEntrySchema<"announcements">
} & { render(): Render[".md"] };
"2023-fossil-sorting.md": {
	id: "2023-fossil-sorting.md";
  slug: "2023-fossil-sorting";
  body: string;
  collection: "announcements";
  data: InferEntrySchema<"announcements">
} & { render(): Render[".md"] };
"2023-new-t-shirts.md": {
	id: "2023-new-t-shirts.md";
  slug: "2023-new-t-shirts";
  body: string;
  collection: "announcements";
  data: InferEntrySchema<"announcements">
} & { render(): Render[".md"] };
"2024-04-paleo-2024-announcement.md": {
	id: "2024-04-paleo-2024-announcement.md";
  slug: "2024-04-paleo-2024-announcement";
  body: string;
  collection: "announcements";
  data: InferEntrySchema<"announcements">
} & { render(): Render[".md"] };
"2024-04-paleo-2024-fieldTripsAnnouncement.md": {
	id: "2024-04-paleo-2024-fieldTripsAnnouncement.md";
  slug: "2024-04-paleo-2024-fieldtripsannouncement";
  body: string;
  collection: "announcements";
  data: InferEntrySchema<"announcements">
} & { render(): Render[".md"] };
"2024-08-fossilSorting1.md": {
	id: "2024-08-fossilSorting1.md";
  slug: "2024-08-fossilsorting1";
  body: string;
  collection: "announcements";
  data: InferEntrySchema<"announcements">
} & { render(): Render[".md"] };
"2024-09-12-meeting-only.md": {
	id: "2024-09-12-meeting-only.md";
  slug: "2024-09-12-meeting-only";
  body: string;
  collection: "announcements";
  data: InferEntrySchema<"announcements">
} & { render(): Render[".md"] };
"2024-10-fossilSorting2.md": {
	id: "2024-10-fossilSorting2.md";
  slug: "2024-10-fossilsorting2";
  body: string;
  collection: "announcements";
  data: InferEntrySchema<"announcements">
} & { render(): Render[".md"] };
"2024-10-uofa-event.md": {
	id: "2024-10-uofa-event.md";
  slug: "2024-10-uofa-event";
  body: string;
  collection: "announcements";
  data: InferEntrySchema<"announcements">
} & { render(): Render[".md"] };
"2024-11-13-currie-lecture.md": {
	id: "2024-11-13-currie-lecture.md";
  slug: "2024-11-13-currie-lecture";
  body: string;
  collection: "announcements";
  data: InferEntrySchema<"announcements">
} & { render(): Render[".md"] };
"2024-11-dinosaurProvincialParkJobPosting.md": {
	id: "2024-11-dinosaurProvincialParkJobPosting.md";
  slug: "2024-11-dinosaurprovincialparkjobposting";
  body: string;
  collection: "announcements";
  data: InferEntrySchema<"announcements">
} & { render(): Render[".md"] };
"2024-11-fossilSorting3.md": {
	id: "2024-11-fossilSorting3.md";
  slug: "2024-11-fossilsorting3";
  body: string;
  collection: "announcements";
  data: InferEntrySchema<"announcements">
} & { render(): Render[".md"] };
"2024-11-mike-clark-scholarship.md": {
	id: "2024-11-mike-clark-scholarship.md";
  slug: "2024-11-mike-clark-scholarship";
  body: string;
  collection: "announcements";
  data: InferEntrySchema<"announcements">
} & { render(): Render[".md"] };
"2024-11-symposium.md": {
	id: "2024-11-symposium.md";
  slug: "2024-11-symposium";
  body: string;
  collection: "announcements";
  data: InferEntrySchema<"announcements">
} & { render(): Render[".md"] };
"2024-12-fossilSorting1.md": {
	id: "2024-12-fossilSorting1.md";
  slug: "2024-12-fossilsorting1";
  body: string;
  collection: "announcements";
  data: InferEntrySchema<"announcements">
} & { render(): Render[".md"] };
"2025-01-fossilSorting2.md": {
	id: "2025-01-fossilSorting2.md";
  slug: "2025-01-fossilsorting2";
  body: string;
  collection: "announcements";
  data: InferEntrySchema<"announcements">
} & { render(): Render[".md"] };
"2025-01-fossilSorting3.md": {
	id: "2025-01-fossilSorting3.md";
  slug: "2025-01-fossilsorting3";
  body: string;
  collection: "announcements";
  data: InferEntrySchema<"announcements">
} & { render(): Render[".md"] };
"2025-02-fossilSorting4.md": {
	id: "2025-02-fossilSorting4.md";
  slug: "2025-02-fossilsorting4";
  body: string;
  collection: "announcements";
  data: InferEntrySchema<"announcements">
} & { render(): Render[".md"] };
};
"disclaimers": {
"contactUs.md": {
	id: "contactUs.md";
  slug: "contactus";
  body: string;
  collection: "disclaimers";
  data: InferEntrySchema<"disclaimers">
} & { render(): Render[".md"] };
"contentAccuracy.md": {
	id: "contentAccuracy.md";
  slug: "contentaccuracy";
  body: string;
  collection: "disclaimers";
  data: InferEntrySchema<"disclaimers">
} & { render(): Render[".md"] };
"copyright.md": {
	id: "copyright.md";
  slug: "copyright";
  body: string;
  collection: "disclaimers";
  data: InferEntrySchema<"disclaimers">
} & { render(): Render[".md"] };
"liability.md": {
	id: "liability.md";
  slug: "liability";
  body: string;
  collection: "disclaimers";
  data: InferEntrySchema<"disclaimers">
} & { render(): Render[".md"] };
"linksToOtherWebsites.md": {
	id: "linksToOtherWebsites.md";
  slug: "linkstootherwebsites";
  body: string;
  collection: "disclaimers";
  data: InferEntrySchema<"disclaimers">
} & { render(): Render[".md"] };
"nonEndorsement.md": {
	id: "nonEndorsement.md";
  slug: "nonendorsement";
  body: string;
  collection: "disclaimers";
  data: InferEntrySchema<"disclaimers">
} & { render(): Render[".md"] };
"privacyPolicy.md": {
	id: "privacyPolicy.md";
  slug: "privacypolicy";
  body: string;
  collection: "disclaimers";
  data: InferEntrySchema<"disclaimers">
} & { render(): Render[".md"] };
"publicDomainSoftware.md": {
	id: "publicDomainSoftware.md";
  slug: "publicdomainsoftware";
  body: string;
  collection: "disclaimers";
  data: InferEntrySchema<"disclaimers">
} & { render(): Render[".md"] };
};
"events": {
"2023-03-18-symposium.md": {
	id: "2023-03-18-symposium.md";
  slug: "2023-03-18-symposium";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2023-04-11-tyndall-stone-presentation.md": {
	id: "2023-04-11-tyndall-stone-presentation.md";
  slug: "2023-04-11-tyndall-stone-presentation";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2023-04-21-monthlyMeeting.md": {
	id: "2023-04-21-monthlyMeeting.md";
  slug: "2023-04-21-monthlymeeting";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2023-06-17-warner-field-trip.md": {
	id: "2023-06-17-warner-field-trip.md";
  slug: "2023-06-17-warner-field-trip";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2023-07-08-kpg-boundary-field-trip.md": {
	id: "2023-07-08-kpg-boundary-field-trip.md";
  slug: "2023-07-08-kpg-boundary-field-trip";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2023-07-14-green-river-field-trip.md": {
	id: "2023-07-14-green-river-field-trip.md";
  slug: "2023-07-14-green-river-field-trip";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2023-08-19-danek-bonebed-field-trip.md": {
	id: "2023-08-19-danek-bonebed-field-trip.md";
  slug: "2023-08-19-danek-bonebed-field-trip";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2023-09-15-monthlyMeeting.md": {
	id: "2023-09-15-monthlyMeeting.md";
  slug: "2023-09-15-monthlymeeting";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2023-09-16-tyndall-stone-field-trip.md": {
	id: "2023-09-16-tyndall-stone-field-trip.md";
  slug: "2023-09-16-tyndall-stone-field-trip";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2023-10-20-monthlyMeeting.md": {
	id: "2023-10-20-monthlyMeeting.md";
  slug: "2023-10-20-monthlymeeting";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2023-11-05-fossilSorting1.md": {
	id: "2023-11-05-fossilSorting1.md";
  slug: "2023-11-05-fossilsorting1";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2023-11-17-monthlyMeeting.md": {
	id: "2023-11-17-monthlyMeeting.md";
  slug: "2023-11-17-monthlymeeting";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2023-11-26-fossilSorting2.md": {
	id: "2023-11-26-fossilSorting2.md";
  slug: "2023-11-26-fossilsorting2";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2023-12-08-monthlyMeeting.md": {
	id: "2023-12-08-monthlyMeeting.md";
  slug: "2023-12-08-monthlymeeting";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2023-12-10-fossilSorting3.md": {
	id: "2023-12-10-fossilSorting3.md";
  slug: "2023-12-10-fossilsorting3";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2024-01-14-fossilSorting1.md": {
	id: "2024-01-14-fossilSorting1.md";
  slug: "2024-01-14-fossilsorting1";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2024-01-19-monthlyMeeting.md": {
	id: "2024-01-19-monthlyMeeting.md";
  slug: "2024-01-19-monthlymeeting";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2024-01-28-fossilSorting2.md": {
	id: "2024-01-28-fossilSorting2.md";
  slug: "2024-01-28-fossilsorting2";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2024-02-11-fossilSorting3.md": {
	id: "2024-02-11-fossilSorting3.md";
  slug: "2024-02-11-fossilsorting3";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2024-02-16-monthlyMeeting.md": {
	id: "2024-02-16-monthlyMeeting.md";
  slug: "2024-02-16-monthlymeeting";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2024-02-25-fossilSorting4.md": {
	id: "2024-02-25-fossilSorting4.md";
  slug: "2024-02-25-fossilsorting4";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2024-03-10-fossilSorting5.md": {
	id: "2024-03-10-fossilSorting5.md";
  slug: "2024-03-10-fossilsorting5";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2024-03-16-paleoSymposium1.md": {
	id: "2024-03-16-paleoSymposium1.md";
  slug: "2024-03-16-paleosymposium1";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2024-04-19-monthlyMeeting.md": {
	id: "2024-04-19-monthlyMeeting.md";
  slug: "2024-04-19-monthlymeeting";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2024-05-10-monthlyMeeting.md": {
	id: "2024-05-10-monthlyMeeting.md";
  slug: "2024-05-10-monthlymeeting";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2024-06-22-fieldTrip-dorothy.md": {
	id: "2024-06-22-fieldTrip-dorothy.md";
  slug: "2024-06-22-fieldtrip-dorothy";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2024-07-06-fieldTrip-huxleyKp.md": {
	id: "2024-07-06-fieldTrip-huxleyKp.md";
  slug: "2024-07-06-fieldtrip-huxleykp";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2024-07-25-fieldTrip-montana.md": {
	id: "2024-07-25-fieldTrip-montana.md";
  slug: "2024-07-25-fieldtrip-montana";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2024-08-24-fieldTrip-grandPrairie.md": {
	id: "2024-08-24-fieldTrip-grandPrairie.md";
  slug: "2024-08-24-fieldtrip-grandprairie";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2024-09-14-fieldTrip-walkingTyndallStone.md": {
	id: "2024-09-14-fieldTrip-walkingTyndallStone.md";
  slug: "2024-09-14-fieldtrip-walkingtyndallstone";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2024-09-20-monthlyMeeting.md": {
	id: "2024-09-20-monthlyMeeting.md";
  slug: "2024-09-20-monthlymeeting";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2024-10-18-monthlyMeeting.md": {
	id: "2024-10-18-monthlyMeeting.md";
  slug: "2024-10-18-monthlymeeting";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2024-10-20-fossilSorting1.md": {
	id: "2024-10-20-fossilSorting1.md";
  slug: "2024-10-20-fossilsorting1";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2024-11-15-monthlyMeeting.md": {
	id: "2024-11-15-monthlyMeeting.md";
  slug: "2024-11-15-monthlymeeting";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2024-11-17-fossilSorting2.md": {
	id: "2024-11-17-fossilSorting2.md";
  slug: "2024-11-17-fossilsorting2";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2024-11-22-rtmp-sleepin.md": {
	id: "2024-11-22-rtmp-sleepin.md";
  slug: "2024-11-22-rtmp-sleepin";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2024-12-01-fossilSorting3.md": {
	id: "2024-12-01-fossilSorting3.md";
  slug: "2024-12-01-fossilsorting3";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2024-12-13-monthlyMeeting.md": {
	id: "2024-12-13-monthlyMeeting.md";
  slug: "2024-12-13-monthlymeeting";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2025-01-12-fossilSorting1.md": {
	id: "2025-01-12-fossilSorting1.md";
  slug: "2025-01-12-fossilsorting1";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2025-01-17-monthlyMeeting.md": {
	id: "2025-01-17-monthlyMeeting.md";
  slug: "2025-01-17-monthlymeeting";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2025-01-26-fossilSorting2.md": {
	id: "2025-01-26-fossilSorting2.md";
  slug: "2025-01-26-fossilsorting2";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2025-02-02-fossilSorting3.md": {
	id: "2025-02-02-fossilSorting3.md";
  slug: "2025-02-02-fossilsorting3";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2025-02-21-monthlyMeeting.md": {
	id: "2025-02-21-monthlyMeeting.md";
  slug: "2025-02-21-monthlymeeting";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2025-03-02-fossilSorting4.md": {
	id: "2025-03-02-fossilSorting4.md";
  slug: "2025-03-02-fossilsorting4";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2025-03-1516-symposium.md": {
	id: "2025-03-1516-symposium.md";
  slug: "2025-03-1516-symposium";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2025-04-11-monthlyMeeting.md": {
	id: "2025-04-11-monthlyMeeting.md";
  slug: "2025-04-11-monthlymeeting";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2025-05-09-monthlyMeeting.md": {
	id: "2025-05-09-monthlyMeeting.md";
  slug: "2025-05-09-monthlymeeting";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2025-09-19-monthlyMeeting.md": {
	id: "2025-09-19-monthlyMeeting.md";
  slug: "2025-09-19-monthlymeeting";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2025-10-17-monthlyMeeting.md": {
	id: "2025-10-17-monthlyMeeting.md";
  slug: "2025-10-17-monthlymeeting";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2025-11-21-monthlyMeeting.md": {
	id: "2025-11-21-monthlyMeeting.md";
  slug: "2025-11-21-monthlymeeting";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"2025-12-12-monthlyMeeting.md": {
	id: "2025-12-12-monthlyMeeting.md";
  slug: "2025-12-12-monthlymeeting";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
};
"faqs": {
"becomeAPaleontologist.md": {
	id: "becomeAPaleontologist.md";
  slug: "becomeapaleontologist";
  body: string;
  collection: "faqs";
  data: InferEntrySchema<"faqs">
} & { render(): Render[".md"] };
"books.md": {
	id: "books.md";
  slug: "books";
  body: string;
  collection: "faqs";
  data: InferEntrySchema<"faqs">
} & { render(): Render[".md"] };
"fossilRegulations.md": {
	id: "fossilRegulations.md";
  slug: "fossilregulations";
  body: string;
  collection: "faqs";
  data: InferEntrySchema<"faqs">
} & { render(): Render[".md"] };
"identification.md": {
	id: "identification.md";
  slug: "identification";
  body: string;
  collection: "faqs";
  data: InferEntrySchema<"faqs">
} & { render(): Render[".md"] };
"memberFieldTrips.md": {
	id: "memberFieldTrips.md";
  slug: "memberfieldtrips";
  body: string;
  collection: "faqs";
  data: InferEntrySchema<"faqs">
} & { render(): Render[".md"] };
"parking.md": {
	id: "parking.md";
  slug: "parking";
  body: string;
  collection: "faqs";
  data: InferEntrySchema<"faqs">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		"bulletinVolumes": {
"1": {
	id: "1";
  collection: "bulletinVolumes";
  data: InferEntrySchema<"bulletinVolumes">
};
"10": {
	id: "10";
  collection: "bulletinVolumes";
  data: InferEntrySchema<"bulletinVolumes">
};
"11": {
	id: "11";
  collection: "bulletinVolumes";
  data: InferEntrySchema<"bulletinVolumes">
};
"12": {
	id: "12";
  collection: "bulletinVolumes";
  data: InferEntrySchema<"bulletinVolumes">
};
"13": {
	id: "13";
  collection: "bulletinVolumes";
  data: InferEntrySchema<"bulletinVolumes">
};
"14": {
	id: "14";
  collection: "bulletinVolumes";
  data: InferEntrySchema<"bulletinVolumes">
};
"15": {
	id: "15";
  collection: "bulletinVolumes";
  data: InferEntrySchema<"bulletinVolumes">
};
"16": {
	id: "16";
  collection: "bulletinVolumes";
  data: InferEntrySchema<"bulletinVolumes">
};
"17": {
	id: "17";
  collection: "bulletinVolumes";
  data: InferEntrySchema<"bulletinVolumes">
};
"18": {
	id: "18";
  collection: "bulletinVolumes";
  data: InferEntrySchema<"bulletinVolumes">
};
"19": {
	id: "19";
  collection: "bulletinVolumes";
  data: InferEntrySchema<"bulletinVolumes">
};
"2": {
	id: "2";
  collection: "bulletinVolumes";
  data: InferEntrySchema<"bulletinVolumes">
};
"20": {
	id: "20";
  collection: "bulletinVolumes";
  data: InferEntrySchema<"bulletinVolumes">
};
"21": {
	id: "21";
  collection: "bulletinVolumes";
  data: InferEntrySchema<"bulletinVolumes">
};
"22": {
	id: "22";
  collection: "bulletinVolumes";
  data: InferEntrySchema<"bulletinVolumes">
};
"23": {
	id: "23";
  collection: "bulletinVolumes";
  data: InferEntrySchema<"bulletinVolumes">
};
"24": {
	id: "24";
  collection: "bulletinVolumes";
  data: InferEntrySchema<"bulletinVolumes">
};
"25": {
	id: "25";
  collection: "bulletinVolumes";
  data: InferEntrySchema<"bulletinVolumes">
};
"26": {
	id: "26";
  collection: "bulletinVolumes";
  data: InferEntrySchema<"bulletinVolumes">
};
"27": {
	id: "27";
  collection: "bulletinVolumes";
  data: InferEntrySchema<"bulletinVolumes">
};
"28": {
	id: "28";
  collection: "bulletinVolumes";
  data: InferEntrySchema<"bulletinVolumes">
};
"29": {
	id: "29";
  collection: "bulletinVolumes";
  data: InferEntrySchema<"bulletinVolumes">
};
"3": {
	id: "3";
  collection: "bulletinVolumes";
  data: InferEntrySchema<"bulletinVolumes">
};
"30": {
	id: "30";
  collection: "bulletinVolumes";
  data: InferEntrySchema<"bulletinVolumes">
};
"31": {
	id: "31";
  collection: "bulletinVolumes";
  data: InferEntrySchema<"bulletinVolumes">
};
"32": {
	id: "32";
  collection: "bulletinVolumes";
  data: InferEntrySchema<"bulletinVolumes">
};
"33": {
	id: "33";
  collection: "bulletinVolumes";
  data: InferEntrySchema<"bulletinVolumes">
};
"34": {
	id: "34";
  collection: "bulletinVolumes";
  data: InferEntrySchema<"bulletinVolumes">
};
"35": {
	id: "35";
  collection: "bulletinVolumes";
  data: InferEntrySchema<"bulletinVolumes">
};
"36": {
	id: "36";
  collection: "bulletinVolumes";
  data: InferEntrySchema<"bulletinVolumes">
};
"37": {
	id: "37";
  collection: "bulletinVolumes";
  data: InferEntrySchema<"bulletinVolumes">
};
"38": {
	id: "38";
  collection: "bulletinVolumes";
  data: InferEntrySchema<"bulletinVolumes">
};
"4": {
	id: "4";
  collection: "bulletinVolumes";
  data: InferEntrySchema<"bulletinVolumes">
};
"5": {
	id: "5";
  collection: "bulletinVolumes";
  data: InferEntrySchema<"bulletinVolumes">
};
"6": {
	id: "6";
  collection: "bulletinVolumes";
  data: InferEntrySchema<"bulletinVolumes">
};
"7": {
	id: "7";
  collection: "bulletinVolumes";
  data: InferEntrySchema<"bulletinVolumes">
};
"8": {
	id: "8";
  collection: "bulletinVolumes";
  data: InferEntrySchema<"bulletinVolumes">
};
"9": {
	id: "9";
  collection: "bulletinVolumes";
  data: InferEntrySchema<"bulletinVolumes">
};
};
"bulletins": {
"011": {
	id: "011";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"012": {
	id: "012";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"013": {
	id: "013";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"014": {
	id: "014";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"021": {
	id: "021";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"022": {
	id: "022";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"023": {
	id: "023";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"024": {
	id: "024";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"031": {
	id: "031";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"032": {
	id: "032";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"033": {
	id: "033";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"034": {
	id: "034";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"041": {
	id: "041";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"042": {
	id: "042";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"043": {
	id: "043";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"044": {
	id: "044";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"051": {
	id: "051";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"052": {
	id: "052";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"053": {
	id: "053";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"054": {
	id: "054";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"061": {
	id: "061";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"062": {
	id: "062";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"063": {
	id: "063";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"064": {
	id: "064";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"071": {
	id: "071";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"072": {
	id: "072";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"073": {
	id: "073";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"074": {
	id: "074";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"081": {
	id: "081";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"082": {
	id: "082";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"083": {
	id: "083";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"084": {
	id: "084";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"091": {
	id: "091";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"092": {
	id: "092";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"093": {
	id: "093";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"094": {
	id: "094";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"101": {
	id: "101";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"102": {
	id: "102";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"103": {
	id: "103";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"104": {
	id: "104";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"111": {
	id: "111";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"112": {
	id: "112";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"113": {
	id: "113";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"114": {
	id: "114";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"121": {
	id: "121";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"122": {
	id: "122";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"123": {
	id: "123";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"124": {
	id: "124";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"131": {
	id: "131";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"132": {
	id: "132";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"133": {
	id: "133";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"134": {
	id: "134";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"141": {
	id: "141";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"142": {
	id: "142";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"143": {
	id: "143";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"144": {
	id: "144";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"151": {
	id: "151";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"152": {
	id: "152";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"153": {
	id: "153";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"154": {
	id: "154";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"161": {
	id: "161";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"162": {
	id: "162";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"163": {
	id: "163";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"164": {
	id: "164";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"171": {
	id: "171";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"172": {
	id: "172";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"173": {
	id: "173";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"174": {
	id: "174";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"181": {
	id: "181";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"182": {
	id: "182";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"183": {
	id: "183";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"184": {
	id: "184";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"191": {
	id: "191";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"192": {
	id: "192";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"193": {
	id: "193";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"194": {
	id: "194";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"201": {
	id: "201";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"202": {
	id: "202";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"203": {
	id: "203";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"204": {
	id: "204";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"211": {
	id: "211";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"212": {
	id: "212";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"213": {
	id: "213";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"214": {
	id: "214";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"221": {
	id: "221";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"222": {
	id: "222";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"223": {
	id: "223";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"224": {
	id: "224";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"231": {
	id: "231";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"232": {
	id: "232";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"233": {
	id: "233";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"234": {
	id: "234";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"241": {
	id: "241";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"242": {
	id: "242";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"243": {
	id: "243";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"244": {
	id: "244";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"251": {
	id: "251";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"252": {
	id: "252";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"253": {
	id: "253";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"254": {
	id: "254";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"261": {
	id: "261";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"262": {
	id: "262";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"263": {
	id: "263";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"264": {
	id: "264";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"271": {
	id: "271";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"272": {
	id: "272";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"273": {
	id: "273";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"274": {
	id: "274";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"281": {
	id: "281";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"282": {
	id: "282";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"283": {
	id: "283";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"284": {
	id: "284";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"291": {
	id: "291";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"292": {
	id: "292";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"293": {
	id: "293";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"294": {
	id: "294";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"301": {
	id: "301";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"302": {
	id: "302";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"303": {
	id: "303";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"304": {
	id: "304";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"311": {
	id: "311";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"312": {
	id: "312";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"313": {
	id: "313";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"314": {
	id: "314";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"321": {
	id: "321";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"322": {
	id: "322";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"323": {
	id: "323";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"324": {
	id: "324";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"331": {
	id: "331";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"332": {
	id: "332";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"333": {
	id: "333";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"334": {
	id: "334";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"341": {
	id: "341";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"342": {
	id: "342";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"343": {
	id: "343";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"344": {
	id: "344";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"351": {
	id: "351";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"352": {
	id: "352";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"353": {
	id: "353";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"354": {
	id: "354";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"361": {
	id: "361";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"362": {
	id: "362";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"363": {
	id: "363";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"364": {
	id: "364";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"371": {
	id: "371";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"372": {
	id: "372";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"373": {
	id: "373";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"374": {
	id: "374";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"381": {
	id: "381";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"382": {
	id: "382";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"383": {
	id: "383";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
"384": {
	id: "384";
  collection: "bulletins";
  data: InferEntrySchema<"bulletins">
};
};
"fossils": {
"aps.1985.13": {
	id: "aps.1985.13";
  collection: "fossils";
  data: InferEntrySchema<"fossils">
};
"aps.1985.26": {
	id: "aps.1985.26";
  collection: "fossils";
  data: InferEntrySchema<"fossils">
};
"aps.1985.31": {
	id: "aps.1985.31";
  collection: "fossils";
  data: InferEntrySchema<"fossils">
};
"aps.1986.02": {
	id: "aps.1986.02";
  collection: "fossils";
  data: InferEntrySchema<"fossils">
};
"aps.1986.15": {
	id: "aps.1986.15";
  collection: "fossils";
  data: InferEntrySchema<"fossils">
};
"aps.1986.37": {
	id: "aps.1986.37";
  collection: "fossils";
  data: InferEntrySchema<"fossils">
};
"aps.1986.49": {
	id: "aps.1986.49";
  collection: "fossils";
  data: InferEntrySchema<"fossils">
};
"aps.1987.12": {
	id: "aps.1987.12";
  collection: "fossils";
  data: InferEntrySchema<"fossils">
};
"aps.1987.13": {
	id: "aps.1987.13";
  collection: "fossils";
  data: InferEntrySchema<"fossils">
};
"aps.1990.04": {
	id: "aps.1990.04";
  collection: "fossils";
  data: InferEntrySchema<"fossils">
};
"aps.1992.06": {
	id: "aps.1992.06";
  collection: "fossils";
  data: InferEntrySchema<"fossils">
};
"aps.1992.12": {
	id: "aps.1992.12";
  collection: "fossils";
  data: InferEntrySchema<"fossils">
};
"aps.1992.14": {
	id: "aps.1992.14";
  collection: "fossils";
  data: InferEntrySchema<"fossils">
};
"aps.1992.15": {
	id: "aps.1992.15";
  collection: "fossils";
  data: InferEntrySchema<"fossils">
};
"aps.1992.16": {
	id: "aps.1992.16";
  collection: "fossils";
  data: InferEntrySchema<"fossils">
};
"aps.1992.19": {
	id: "aps.1992.19";
  collection: "fossils";
  data: InferEntrySchema<"fossils">
};
"aps.1992.20": {
	id: "aps.1992.20";
  collection: "fossils";
  data: InferEntrySchema<"fossils">
};
"aps.2002.01": {
	id: "aps.2002.01";
  collection: "fossils";
  data: InferEntrySchema<"fossils">
};
"aps.2003.01": {
	id: "aps.2003.01";
  collection: "fossils";
  data: InferEntrySchema<"fossils">
};
"aps.2003.02": {
	id: "aps.2003.02";
  collection: "fossils";
  data: InferEntrySchema<"fossils">
};
"aps.2004.26": {
	id: "aps.2004.26";
  collection: "fossils";
  data: InferEntrySchema<"fossils">
};
"aps.2004.29": {
	id: "aps.2004.29";
  collection: "fossils";
  data: InferEntrySchema<"fossils">
};
"aps.2004.32": {
	id: "aps.2004.32";
  collection: "fossils";
  data: InferEntrySchema<"fossils">
};
"aps.2004.33": {
	id: "aps.2004.33";
  collection: "fossils";
  data: InferEntrySchema<"fossils">
};
"aps.2006.41": {
	id: "aps.2006.41";
  collection: "fossils";
  data: InferEntrySchema<"fossils">
};
"aps.2006.63": {
	id: "aps.2006.63";
  collection: "fossils";
  data: InferEntrySchema<"fossils">
};
"aps.2006.64": {
	id: "aps.2006.64";
  collection: "fossils";
  data: InferEntrySchema<"fossils">
};
"aps.2013.03": {
	id: "aps.2013.03";
  collection: "fossils";
  data: InferEntrySchema<"fossils">
};
"aps.2013.05": {
	id: "aps.2013.05";
  collection: "fossils";
  data: InferEntrySchema<"fossils">
};
"aps.2013.08": {
	id: "aps.2013.08";
  collection: "fossils";
  data: InferEntrySchema<"fossils">
};
"aps.2013.09": {
	id: "aps.2013.09";
  collection: "fossils";
  data: InferEntrySchema<"fossils">
};
"aps.2013.11": {
	id: "aps.2013.11";
  collection: "fossils";
  data: InferEntrySchema<"fossils">
};
"aps.2013.12": {
	id: "aps.2013.12";
  collection: "fossils";
  data: InferEntrySchema<"fossils">
};
"aps.2013.14": {
	id: "aps.2013.14";
  collection: "fossils";
  data: InferEntrySchema<"fossils">
};
"aps.2022.063": {
	id: "aps.2022.063";
  collection: "fossils";
  data: InferEntrySchema<"fossils">
};
"aps.2022.69": {
	id: "aps.2022.69";
  collection: "fossils";
  data: InferEntrySchema<"fossils">
};
};

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = typeof import("../src/content/config");
}
