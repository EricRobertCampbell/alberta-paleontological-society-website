import { it, expect } from 'vitest'
import { isDateBetween } from '../dates'

const testCases = [
    {
        // good
        start: '2025-01-01',
        date: '2025-04-01',
        end: '2025-12-31',
        expected: true,
    },
    {
        // start date = date -> good
        start: '2025-01-01',
        date: '2025-01-01',
        end: '2025-12-31',
        expected: true,
    },
    {
        // end date = date -> good
        start: '2025-01-01',
        date: '2025-04-01',
        end: '2025-04-01',
        expected: true,
    },
    {
        // bad - date before start
        date: '2025-04-01',
        start: '2025-05-01',
        end: '2025-12-31',
        expected: false,
    },
    {
        // bad - date after end
        date: '2025-04-01',
        start: '2025-03-01',
        end: '2025-03-02',
        expected: false,
    },
]
it.each(testCases)(
    'should return $expected for date $date between $start and $end',
    ({ date, start, end, expected }) => {
        const result = isDateBetween(date, { start, end })
        expect(result).toBe(expected)
    }
)
