import { describe, expect, it } from 'vitest'
import { listInterstitialPresentations } from './interstitialIndex'

describe('listInterstitialPresentations', () => {
    it('labels a dated deck and links to its page', () => {
        const presentations = listInterstitialPresentations([
            './20261016.astro',
        ])

        expect(presentations).toEqual([
            {
                href: '/interstitial/20261016',
                label: 'October 16, 2026',
                sortKey: '2026-10-16',
            },
        ])
    })

    it('labels symposium decks and places them in mid-March of that year', () => {
        const presentations = listInterstitialPresentations([
            'src/pages/interstitial/20260417.astro',
            'src/pages/interstitial/paleo2026.astro',
            'src/pages/interstitial/20260220.astro',
        ])

        expect(presentations.map((presentation) => presentation.label)).toEqual([
            'April 17, 2026',
            'Paleo 2026',
            'February 20, 2026',
        ])
        expect(presentations.map((presentation) => presentation.href)).toEqual([
            '/interstitial/20260417',
            '/interstitial/paleo2026',
            '/interstitial/20260220',
        ])
    })

    it('omits the index page and still lists an unrecognized filename', () => {
        const presentations = listInterstitialPresentations([
            './index.astro',
            './notes.astro',
            './20261016.astro',
        ])

        expect(presentations.map((presentation) => presentation.label)).toEqual([
            'October 16, 2026',
            'notes',
        ])
    })
})
