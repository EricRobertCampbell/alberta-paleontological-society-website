import { describe, expect, it } from 'vitest'
import { splitAttribution } from './attributionLinks'

describe('splitAttribution', () => {
    it('leaves a credit with no address as text', () => {
        expect(splitAttribution('Photo by Mona Trick.')).toEqual([
            { kind: 'text', text: 'Photo by Mona Trick.' },
        ])
    })

    it('turns an http address into a link', () => {
        expect(
            splitAttribution(
                'Photo by Annie McIntosh. https://www.ualberta.ca/en/folio/2022/11/student-led-dinosaur-excavation-culminates-in-airlift.html'
            )
        ).toEqual([
            { kind: 'text', text: 'Photo by Annie McIntosh. ' },
            {
                kind: 'link',
                href: 'https://www.ualberta.ca/en/folio/2022/11/student-led-dinosaur-excavation-culminates-in-airlift.html',
                text: 'https://www.ualberta.ca/en/folio/2022/11/student-led-dinosaur-excavation-culminates-in-airlift.html',
            },
        ])
    })

    it('turns an angle-bracket address into a link and keeps the surrounding credit', () => {
        expect(
            splitAttribution(
                'Jeffrey Beall, CC BY 4.0 <https://creativecommons.org/licenses/by/4.0>, via Wikimedia Commons'
            )
        ).toEqual([
            { kind: 'text', text: 'Jeffrey Beall, CC BY 4.0 ' },
            {
                kind: 'link',
                href: 'https://creativecommons.org/licenses/by/4.0',
                text: 'https://creativecommons.org/licenses/by/4.0',
            },
            { kind: 'text', text: ', via Wikimedia Commons' },
        ])
    })

    it('does not treat a non-http address as a link', () => {
        expect(
            splitAttribution('See javascript:alert(1) for details.')
        ).toEqual([
            { kind: 'text', text: 'See javascript:alert(1) for details.' },
        ])
    })
})
