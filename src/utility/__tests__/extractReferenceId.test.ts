import { it, expect, describe } from 'vitest'
import { extractReferenceId } from '../functions'

describe('extractReferenceId', () => {
    const testCases = [
        {
            ref: '2025-10-17-tako-koning-joggins',
            expected: '2025-10-17-tako-koning-joggins',
            description: 'string ID with hyphens',
        },
        {
            ref: { id: '2025-10-17-tako-koning-joggins' },
            expected: '2025-10-17-tako-koning-joggins',
            description: 'object with id property containing hyphens',
        },
        {
            ref: '',
            expected: null,
            description: 'empty string',
        },
        {
            ref: null,
            expected: null,
            description: 'null value',
        },
        {
            ref: undefined,
            expected: null,
            description: 'undefined value',
        },
        {
            ref: {},
            expected: null,
            description: 'empty object without id property',
        },
        {
            ref: { name: 'test' },
            expected: null,
            description: 'object without id property',
        },
        {
            ref: { id: '' },
            expected: '',
            description: 'object with empty id property',
        },
    ]

    it.each(testCases)(
        'should extract ID from $description',
        ({ ref, expected }) => {
            const result = extractReferenceId(ref as any)
            expect(result).toBe(expected)
        }
    )
})

