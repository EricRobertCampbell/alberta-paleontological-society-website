import { describe, expect, it } from 'vitest'
import { contentEntryPublicId } from './contentEntry'

describe('contentEntryPublicId', () => {
    it('returns slug when present (legacy content collections)', () => {
        expect(
            contentEntryPublicId({
                id: 'events/2026-11-13-example.md',
                slug: '2026-11-13-example',
            })
        ).toBe('2026-11-13-example')
    })

    it('returns id when slug is absent (Content Layer)', () => {
        expect(contentEntryPublicId({ id: '2026-11-13-example' })).toBe(
            '2026-11-13-example'
        )
    })

    it('prefers slug over id when both exist and differ', () => {
        expect(
            contentEntryPublicId({
                id: 'legacy-path.md',
                slug: '2026-11-13-example',
            })
        ).toBe('2026-11-13-example')
    })
})
