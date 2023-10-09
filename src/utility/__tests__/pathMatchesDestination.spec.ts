import { it, expect } from 'vitest'

import { pathMatchesDestination } from '../functions'

const cases: Array<{ path: string; destination: string; match: boolean }> = [
    { path: '/', destination: '/', match: true },
    { path: '/', destination: '/events/', match: false },
    { path: '/', destination: '/events', match: false },
    { path: '/events', destination: '/events', match: true },
    { path: '/events/', destination: '/events', match: true },
    { path: '/events', destination: '/events/', match: true },
    { path: '/events/', destination: '/events/', match: true },
    { path: '/events', destination: '/events/monthlymeetings', match: false },
    { path: '/events/monthlymeetings', destination: '/events/', match: true }, // if you are at a subheading you should register as being at the upper part
    { path: '/events', destination: '/', match: false },
    {
        path: '/events/monthlymeetings',
        destination: '/events/fieldtrips',
        match: false,
    },
]
it.each(cases)(
    'path $path matches destination $destination? $match',
    ({ path, destination, match }) => {
        expect(pathMatchesDestination(path, destination)).toBe(match)
    }
)
