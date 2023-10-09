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
  data: any
} & { render(): Render[".md"] };
"2023-fossil-sorting.md": {
	id: "2023-fossil-sorting.md";
  slug: "2023-fossil-sorting";
  body: string;
  collection: "announcements";
  data: any
} & { render(): Render[".md"] };
};
"disclaimers": {
"contactUs.md": {
	id: "contactUs.md";
  slug: "contactus";
  body: string;
  collection: "disclaimers";
  data: any
} & { render(): Render[".md"] };
"contentAccuracy.md": {
	id: "contentAccuracy.md";
  slug: "contentaccuracy";
  body: string;
  collection: "disclaimers";
  data: any
} & { render(): Render[".md"] };
"copyright.md": {
	id: "copyright.md";
  slug: "copyright";
  body: string;
  collection: "disclaimers";
  data: any
} & { render(): Render[".md"] };
"liability.md": {
	id: "liability.md";
  slug: "liability";
  body: string;
  collection: "disclaimers";
  data: any
} & { render(): Render[".md"] };
"linksToOtherWebsites.md": {
	id: "linksToOtherWebsites.md";
  slug: "linkstootherwebsites";
  body: string;
  collection: "disclaimers";
  data: any
} & { render(): Render[".md"] };
"nonEndorsement.md": {
	id: "nonEndorsement.md";
  slug: "nonendorsement";
  body: string;
  collection: "disclaimers";
  data: any
} & { render(): Render[".md"] };
"privacyPolicy.md": {
	id: "privacyPolicy.md";
  slug: "privacypolicy";
  body: string;
  collection: "disclaimers";
  data: any
} & { render(): Render[".md"] };
"publicDomainSoftware.md": {
	id: "publicDomainSoftware.md";
  slug: "publicdomainsoftware";
  body: string;
  collection: "disclaimers";
  data: any
} & { render(): Render[".md"] };
};
"events": {
"2023-03-18-symposium.md": {
	id: "2023-03-18-symposium.md";
  slug: "2023-03-18-symposium";
  body: string;
  collection: "events";
  data: any
} & { render(): Render[".md"] };
"2023-04-11-tyndall-stone-presentation.md": {
	id: "2023-04-11-tyndall-stone-presentation.md";
  slug: "2023-04-11-tyndall-stone-presentation";
  body: string;
  collection: "events";
  data: any
} & { render(): Render[".md"] };
"2023-04-21-monthlyMeeting.md": {
	id: "2023-04-21-monthlyMeeting.md";
  slug: "2023-04-21-monthlymeeting";
  body: string;
  collection: "events";
  data: any
} & { render(): Render[".md"] };
"2023-06-17-warner-field-trip.md": {
	id: "2023-06-17-warner-field-trip.md";
  slug: "2023-06-17-warner-field-trip";
  body: string;
  collection: "events";
  data: any
} & { render(): Render[".md"] };
"2023-07-08-kpg-boundary-field-trip.md": {
	id: "2023-07-08-kpg-boundary-field-trip.md";
  slug: "2023-07-08-kpg-boundary-field-trip";
  body: string;
  collection: "events";
  data: any
} & { render(): Render[".md"] };
"2023-07-14-green-river-field-trip.md": {
	id: "2023-07-14-green-river-field-trip.md";
  slug: "2023-07-14-green-river-field-trip";
  body: string;
  collection: "events";
  data: any
} & { render(): Render[".md"] };
"2023-08-19-danek-bonebed-field-trip.md": {
	id: "2023-08-19-danek-bonebed-field-trip.md";
  slug: "2023-08-19-danek-bonebed-field-trip";
  body: string;
  collection: "events";
  data: any
} & { render(): Render[".md"] };
"2023-09-15-monthlyMeeting.md": {
	id: "2023-09-15-monthlyMeeting.md";
  slug: "2023-09-15-monthlymeeting";
  body: string;
  collection: "events";
  data: any
} & { render(): Render[".md"] };
"2023-09-16-tyndall-stone-field-trip.md": {
	id: "2023-09-16-tyndall-stone-field-trip.md";
  slug: "2023-09-16-tyndall-stone-field-trip";
  body: string;
  collection: "events";
  data: any
} & { render(): Render[".md"] };
"2023-10-20-monthlyMeeting.md": {
	id: "2023-10-20-monthlyMeeting.md";
  slug: "2023-10-20-monthlymeeting";
  body: string;
  collection: "events";
  data: any
} & { render(): Render[".md"] };
"2023-11-05-fossilSorting1.md": {
	id: "2023-11-05-fossilSorting1.md";
  slug: "2023-11-05-fossilsorting1";
  body: string;
  collection: "events";
  data: any
} & { render(): Render[".md"] };
"2023-11-17-monthlyMeeting.md": {
	id: "2023-11-17-monthlyMeeting.md";
  slug: "2023-11-17-monthlymeeting";
  body: string;
  collection: "events";
  data: any
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
  data: any
} & { render(): Render[".md"] };
"2023-12-10-fossilSorting3.md": {
	id: "2023-12-10-fossilSorting3.md";
  slug: "2023-12-10-fossilsorting3";
  body: string;
  collection: "events";
  data: any
} & { render(): Render[".md"] };
"2024-03-16-paleoSymposium1.md": {
	id: "2024-03-16-paleoSymposium1.md";
  slug: "2024-03-16-paleosymposium1";
  body: string;
  collection: "events";
  data: any
} & { render(): Render[".md"] };
"2024-03-17-paleoSymposium2.md": {
	id: "2024-03-17-paleoSymposium2.md";
  slug: "2024-03-17-paleosymposium2";
  body: string;
  collection: "events";
  data: any
} & { render(): Render[".md"] };
};
"faqs": {
"becomeAPaleontologist.md": {
	id: "becomeAPaleontologist.md";
  slug: "becomeapaleontologist";
  body: string;
  collection: "faqs";
  data: any
} & { render(): Render[".md"] };
"books.md": {
	id: "books.md";
  slug: "books";
  body: string;
  collection: "faqs";
  data: any
} & { render(): Render[".md"] };
"fossilRegulations.md": {
	id: "fossilRegulations.md";
  slug: "fossilregulations";
  body: string;
  collection: "faqs";
  data: any
} & { render(): Render[".md"] };
"identification.md": {
	id: "identification.md";
  slug: "identification";
  body: string;
  collection: "faqs";
  data: any
} & { render(): Render[".md"] };
"memberFieldTrips.md": {
	id: "memberFieldTrips.md";
  slug: "memberfieldtrips";
  body: string;
  collection: "faqs";
  data: any
} & { render(): Render[".md"] };
"parking.md": {
	id: "parking.md";
  slug: "parking";
  body: string;
  collection: "faqs";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		"bulletinVolumes": {
"1": {
	id: "1";
  collection: "bulletinVolumes";
  data: any
};
"10": {
	id: "10";
  collection: "bulletinVolumes";
  data: any
};
"11": {
	id: "11";
  collection: "bulletinVolumes";
  data: any
};
"12": {
	id: "12";
  collection: "bulletinVolumes";
  data: any
};
"13": {
	id: "13";
  collection: "bulletinVolumes";
  data: any
};
"14": {
	id: "14";
  collection: "bulletinVolumes";
  data: any
};
"15": {
	id: "15";
  collection: "bulletinVolumes";
  data: any
};
"16": {
	id: "16";
  collection: "bulletinVolumes";
  data: any
};
"17": {
	id: "17";
  collection: "bulletinVolumes";
  data: any
};
"18": {
	id: "18";
  collection: "bulletinVolumes";
  data: any
};
"19": {
	id: "19";
  collection: "bulletinVolumes";
  data: any
};
"2": {
	id: "2";
  collection: "bulletinVolumes";
  data: any
};
"20": {
	id: "20";
  collection: "bulletinVolumes";
  data: any
};
"21": {
	id: "21";
  collection: "bulletinVolumes";
  data: any
};
"22": {
	id: "22";
  collection: "bulletinVolumes";
  data: any
};
"23": {
	id: "23";
  collection: "bulletinVolumes";
  data: any
};
"24": {
	id: "24";
  collection: "bulletinVolumes";
  data: any
};
"25": {
	id: "25";
  collection: "bulletinVolumes";
  data: any
};
"26": {
	id: "26";
  collection: "bulletinVolumes";
  data: any
};
"27": {
	id: "27";
  collection: "bulletinVolumes";
  data: any
};
"28": {
	id: "28";
  collection: "bulletinVolumes";
  data: any
};
"29": {
	id: "29";
  collection: "bulletinVolumes";
  data: any
};
"3": {
	id: "3";
  collection: "bulletinVolumes";
  data: any
};
"30": {
	id: "30";
  collection: "bulletinVolumes";
  data: any
};
"31": {
	id: "31";
  collection: "bulletinVolumes";
  data: any
};
"32": {
	id: "32";
  collection: "bulletinVolumes";
  data: any
};
"33": {
	id: "33";
  collection: "bulletinVolumes";
  data: any
};
"34": {
	id: "34";
  collection: "bulletinVolumes";
  data: any
};
"35": {
	id: "35";
  collection: "bulletinVolumes";
  data: any
};
"36": {
	id: "36";
  collection: "bulletinVolumes";
  data: any
};
"37": {
	id: "37";
  collection: "bulletinVolumes";
  data: any
};
"4": {
	id: "4";
  collection: "bulletinVolumes";
  data: any
};
"5": {
	id: "5";
  collection: "bulletinVolumes";
  data: any
};
"6": {
	id: "6";
  collection: "bulletinVolumes";
  data: any
};
"7": {
	id: "7";
  collection: "bulletinVolumes";
  data: any
};
"8": {
	id: "8";
  collection: "bulletinVolumes";
  data: any
};
"9": {
	id: "9";
  collection: "bulletinVolumes";
  data: any
};
};
"bulletins": {
"011": {
	id: "011";
  collection: "bulletins";
  data: any
};
"012": {
	id: "012";
  collection: "bulletins";
  data: any
};
"013": {
	id: "013";
  collection: "bulletins";
  data: any
};
"014": {
	id: "014";
  collection: "bulletins";
  data: any
};
"021": {
	id: "021";
  collection: "bulletins";
  data: any
};
"022": {
	id: "022";
  collection: "bulletins";
  data: any
};
"023": {
	id: "023";
  collection: "bulletins";
  data: any
};
"024": {
	id: "024";
  collection: "bulletins";
  data: any
};
"031": {
	id: "031";
  collection: "bulletins";
  data: any
};
"032": {
	id: "032";
  collection: "bulletins";
  data: any
};
"033": {
	id: "033";
  collection: "bulletins";
  data: any
};
"034": {
	id: "034";
  collection: "bulletins";
  data: any
};
"041": {
	id: "041";
  collection: "bulletins";
  data: any
};
"042": {
	id: "042";
  collection: "bulletins";
  data: any
};
"043": {
	id: "043";
  collection: "bulletins";
  data: any
};
"044": {
	id: "044";
  collection: "bulletins";
  data: any
};
"051": {
	id: "051";
  collection: "bulletins";
  data: any
};
"052": {
	id: "052";
  collection: "bulletins";
  data: any
};
"053": {
	id: "053";
  collection: "bulletins";
  data: any
};
"054": {
	id: "054";
  collection: "bulletins";
  data: any
};
"061": {
	id: "061";
  collection: "bulletins";
  data: any
};
"062": {
	id: "062";
  collection: "bulletins";
  data: any
};
"063": {
	id: "063";
  collection: "bulletins";
  data: any
};
"064": {
	id: "064";
  collection: "bulletins";
  data: any
};
"071": {
	id: "071";
  collection: "bulletins";
  data: any
};
"072": {
	id: "072";
  collection: "bulletins";
  data: any
};
"073": {
	id: "073";
  collection: "bulletins";
  data: any
};
"074": {
	id: "074";
  collection: "bulletins";
  data: any
};
"081": {
	id: "081";
  collection: "bulletins";
  data: any
};
"082": {
	id: "082";
  collection: "bulletins";
  data: any
};
"083": {
	id: "083";
  collection: "bulletins";
  data: any
};
"084": {
	id: "084";
  collection: "bulletins";
  data: any
};
"091": {
	id: "091";
  collection: "bulletins";
  data: any
};
"092": {
	id: "092";
  collection: "bulletins";
  data: any
};
"093": {
	id: "093";
  collection: "bulletins";
  data: any
};
"094": {
	id: "094";
  collection: "bulletins";
  data: any
};
"101": {
	id: "101";
  collection: "bulletins";
  data: any
};
"102": {
	id: "102";
  collection: "bulletins";
  data: any
};
"103": {
	id: "103";
  collection: "bulletins";
  data: any
};
"104": {
	id: "104";
  collection: "bulletins";
  data: any
};
"111": {
	id: "111";
  collection: "bulletins";
  data: any
};
"112": {
	id: "112";
  collection: "bulletins";
  data: any
};
"113": {
	id: "113";
  collection: "bulletins";
  data: any
};
"114": {
	id: "114";
  collection: "bulletins";
  data: any
};
"121": {
	id: "121";
  collection: "bulletins";
  data: any
};
"122": {
	id: "122";
  collection: "bulletins";
  data: any
};
"123": {
	id: "123";
  collection: "bulletins";
  data: any
};
"124": {
	id: "124";
  collection: "bulletins";
  data: any
};
"131": {
	id: "131";
  collection: "bulletins";
  data: any
};
"132": {
	id: "132";
  collection: "bulletins";
  data: any
};
"133": {
	id: "133";
  collection: "bulletins";
  data: any
};
"134": {
	id: "134";
  collection: "bulletins";
  data: any
};
"141": {
	id: "141";
  collection: "bulletins";
  data: any
};
"142": {
	id: "142";
  collection: "bulletins";
  data: any
};
"143": {
	id: "143";
  collection: "bulletins";
  data: any
};
"144": {
	id: "144";
  collection: "bulletins";
  data: any
};
"151": {
	id: "151";
  collection: "bulletins";
  data: any
};
"152": {
	id: "152";
  collection: "bulletins";
  data: any
};
"153": {
	id: "153";
  collection: "bulletins";
  data: any
};
"154": {
	id: "154";
  collection: "bulletins";
  data: any
};
"161": {
	id: "161";
  collection: "bulletins";
  data: any
};
"162": {
	id: "162";
  collection: "bulletins";
  data: any
};
"163": {
	id: "163";
  collection: "bulletins";
  data: any
};
"164": {
	id: "164";
  collection: "bulletins";
  data: any
};
"171": {
	id: "171";
  collection: "bulletins";
  data: any
};
"172": {
	id: "172";
  collection: "bulletins";
  data: any
};
"173": {
	id: "173";
  collection: "bulletins";
  data: any
};
"174": {
	id: "174";
  collection: "bulletins";
  data: any
};
"181": {
	id: "181";
  collection: "bulletins";
  data: any
};
"182": {
	id: "182";
  collection: "bulletins";
  data: any
};
"183": {
	id: "183";
  collection: "bulletins";
  data: any
};
"184": {
	id: "184";
  collection: "bulletins";
  data: any
};
"191": {
	id: "191";
  collection: "bulletins";
  data: any
};
"192": {
	id: "192";
  collection: "bulletins";
  data: any
};
"193": {
	id: "193";
  collection: "bulletins";
  data: any
};
"194": {
	id: "194";
  collection: "bulletins";
  data: any
};
"201": {
	id: "201";
  collection: "bulletins";
  data: any
};
"202": {
	id: "202";
  collection: "bulletins";
  data: any
};
"203": {
	id: "203";
  collection: "bulletins";
  data: any
};
"204": {
	id: "204";
  collection: "bulletins";
  data: any
};
"211": {
	id: "211";
  collection: "bulletins";
  data: any
};
"212": {
	id: "212";
  collection: "bulletins";
  data: any
};
"213": {
	id: "213";
  collection: "bulletins";
  data: any
};
"214": {
	id: "214";
  collection: "bulletins";
  data: any
};
"221": {
	id: "221";
  collection: "bulletins";
  data: any
};
"222": {
	id: "222";
  collection: "bulletins";
  data: any
};
"223": {
	id: "223";
  collection: "bulletins";
  data: any
};
"224": {
	id: "224";
  collection: "bulletins";
  data: any
};
"231": {
	id: "231";
  collection: "bulletins";
  data: any
};
"232": {
	id: "232";
  collection: "bulletins";
  data: any
};
"233": {
	id: "233";
  collection: "bulletins";
  data: any
};
"234": {
	id: "234";
  collection: "bulletins";
  data: any
};
"241": {
	id: "241";
  collection: "bulletins";
  data: any
};
"242": {
	id: "242";
  collection: "bulletins";
  data: any
};
"243": {
	id: "243";
  collection: "bulletins";
  data: any
};
"244": {
	id: "244";
  collection: "bulletins";
  data: any
};
"251": {
	id: "251";
  collection: "bulletins";
  data: any
};
"252": {
	id: "252";
  collection: "bulletins";
  data: any
};
"253": {
	id: "253";
  collection: "bulletins";
  data: any
};
"254": {
	id: "254";
  collection: "bulletins";
  data: any
};
"261": {
	id: "261";
  collection: "bulletins";
  data: any
};
"262": {
	id: "262";
  collection: "bulletins";
  data: any
};
"263": {
	id: "263";
  collection: "bulletins";
  data: any
};
"264": {
	id: "264";
  collection: "bulletins";
  data: any
};
"271": {
	id: "271";
  collection: "bulletins";
  data: any
};
"272": {
	id: "272";
  collection: "bulletins";
  data: any
};
"273": {
	id: "273";
  collection: "bulletins";
  data: any
};
"274": {
	id: "274";
  collection: "bulletins";
  data: any
};
"281": {
	id: "281";
  collection: "bulletins";
  data: any
};
"282": {
	id: "282";
  collection: "bulletins";
  data: any
};
"283": {
	id: "283";
  collection: "bulletins";
  data: any
};
"284": {
	id: "284";
  collection: "bulletins";
  data: any
};
"291": {
	id: "291";
  collection: "bulletins";
  data: any
};
"292": {
	id: "292";
  collection: "bulletins";
  data: any
};
"293": {
	id: "293";
  collection: "bulletins";
  data: any
};
"294": {
	id: "294";
  collection: "bulletins";
  data: any
};
"301": {
	id: "301";
  collection: "bulletins";
  data: any
};
"302": {
	id: "302";
  collection: "bulletins";
  data: any
};
"303": {
	id: "303";
  collection: "bulletins";
  data: any
};
"304": {
	id: "304";
  collection: "bulletins";
  data: any
};
"311": {
	id: "311";
  collection: "bulletins";
  data: any
};
"312": {
	id: "312";
  collection: "bulletins";
  data: any
};
"313": {
	id: "313";
  collection: "bulletins";
  data: any
};
"314": {
	id: "314";
  collection: "bulletins";
  data: any
};
"321": {
	id: "321";
  collection: "bulletins";
  data: any
};
"322": {
	id: "322";
  collection: "bulletins";
  data: any
};
"323": {
	id: "323";
  collection: "bulletins";
  data: any
};
"324": {
	id: "324";
  collection: "bulletins";
  data: any
};
"331": {
	id: "331";
  collection: "bulletins";
  data: any
};
"332": {
	id: "332";
  collection: "bulletins";
  data: any
};
"333": {
	id: "333";
  collection: "bulletins";
  data: any
};
"334": {
	id: "334";
  collection: "bulletins";
  data: any
};
"341": {
	id: "341";
  collection: "bulletins";
  data: any
};
"342": {
	id: "342";
  collection: "bulletins";
  data: any
};
"343": {
	id: "343";
  collection: "bulletins";
  data: any
};
"344": {
	id: "344";
  collection: "bulletins";
  data: any
};
"351": {
	id: "351";
  collection: "bulletins";
  data: any
};
"352": {
	id: "352";
  collection: "bulletins";
  data: any
};
"353": {
	id: "353";
  collection: "bulletins";
  data: any
};
"354": {
	id: "354";
  collection: "bulletins";
  data: any
};
"361": {
	id: "361";
  collection: "bulletins";
  data: any
};
"362": {
	id: "362";
  collection: "bulletins";
  data: any
};
"363": {
	id: "363";
  collection: "bulletins";
  data: any
};
"364": {
	id: "364";
  collection: "bulletins";
  data: any
};
"371": {
	id: "371";
  collection: "bulletins";
  data: any
};
"372": {
	id: "372";
  collection: "bulletins";
  data: any
};
"373": {
	id: "373";
  collection: "bulletins";
  data: any
};
"374": {
	id: "374";
  collection: "bulletins";
  data: any
};
};

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = never;
}
