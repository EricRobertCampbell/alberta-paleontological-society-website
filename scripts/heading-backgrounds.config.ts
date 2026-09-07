/**
 * Crop positions for heading background derivatives.
 *
 * Each entry mirrors the old CSS object-position for that photo: the generator
 * extracts only the thin strip that HeadingWithBackground displays (~10:1).
 *
 * positionX / positionY are percentages (0–100), same meaning as
 * `background-position` / `object-position`. Defaults are 50 / 50.
 *
 * If the same photo is needed at two different crops later, add a second id
 * (e.g. `wayne1-alt`) pointing at the same original via `sourceId`.
 */
export type HeadingBackgroundCrop = {
    positionX?: number
    positionY?: number
    /** Override which file in originals/ to read (defaults to the map key). */
    sourceId?: string
}

export const HEADING_BACKGROUND_CROPS: Record<string, HeadingBackgroundCrop> =
    {
        canyonCreek1: {},
        canyonCreek2: { positionY: 30 },
        devilsCoulee: { positionY: 33 },
        devilsCouleeGroup1: { positionY: 35 },
        devilsCouleeMuseum: { positionY: 37 },
        field1: { positionY: 55 },
        fishSkull: { positionY: 50 },
        knudsensFarmIntro: { positionY: 30 },
        kpgBoundary: { positionY: 63 },
        noseHill1: {},
        noseHill2: { positionY: 45 },
        pointCampground1: {},
        redDeerRiverValley1: {},
        rtmpDinos1: {},
        tinyFossil1: {},
        uofaDunkleosteus: { positionY: 55 },
        uofaMuseum1: {},
        upperKananaskisLake1: { positionY: 20 },
        upperKananaskisShale1: {},
        wayne1: { positionY: 20 },
        wayneNodule1: { positionY: 20 },
        waynePetrifiedWood1: { positionY: 60 },
    }
