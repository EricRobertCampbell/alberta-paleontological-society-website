import { formatDateString } from './dates'

export interface InterstitialPresentation {
    href: string
    label: string
    sortKey: string
}

/**
 * Turns interstitial page paths into a newest-first list.
 * Symposium decks named `paleoYYYY` sort as March 14 of that year, between the February and April meeting decks.
 */
export function listInterstitialPresentations(
    paths: string[]
): InterstitialPresentation[] {
    return paths
        .map(toPresentation)
        .filter((item): item is InterstitialPresentation => item !== null)
        .sort(compareNewestFirst)
}

function toPresentation(filePath: string): InterstitialPresentation | null {
    const filename = filePath.split('/').pop() ?? ''
    if (!filename.endsWith('.astro') || filename === 'index.astro') {
        return null
    }

    const stem = filename.slice(0, -'.astro'.length)
    const dated = stem.match(/^(\d{4})(\d{2})(\d{2})$/)
    if (dated) {
        const [, year, month, day] = dated
        const isoDate = `${year}-${month}-${day}`
        return {
            href: `/interstitial/${stem}`,
            label: labelForDate(isoDate, stem),
            sortKey: isoDate,
        }
    }

    const symposium = stem.match(/^paleo(\d{4})$/i)
    if (symposium) {
        const year = symposium[1]
        return {
            href: `/interstitial/${stem}`,
            label: `Paleo ${year}`,
            sortKey: `${year}-03-14`,
        }
    }

    return {
        href: `/interstitial/${stem}`,
        label: stem,
        sortKey: `0-${stem}`,
    }
}

function labelForDate(isoDate: string, fallback: string): string {
    const [, month, day] = isoDate.split('-')
    const monthNum = Number(month)
    const dayNum = Number(day)
    if (monthNum < 1 || monthNum > 12 || dayNum < 1 || dayNum > 31) {
        return fallback
    }
    return formatDateString(isoDate)
}

function compareNewestFirst(
    a: InterstitialPresentation,
    b: InterstitialPresentation
): number {
    return b.sortKey.localeCompare(a.sortKey)
}
