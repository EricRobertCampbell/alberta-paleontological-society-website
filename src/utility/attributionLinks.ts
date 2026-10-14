export type AttributionPart =
    | { kind: 'text'; text: string }
    | { kind: 'link'; href: string; text: string }

const httpAddress = /<?(https?:\/\/[^\s<>]+)>?/g

export function splitAttribution(attribution: string): AttributionPart[] {
    const parts: AttributionPart[] = []
    let lastIndex = 0

    for (const match of attribution.matchAll(httpAddress)) {
        const start = match.index ?? 0
        const address = match[1]
        if (start > lastIndex) {
            parts.push({
                kind: 'text',
                text: attribution.slice(lastIndex, start),
            })
        }
        parts.push({ kind: 'link', href: address, text: address })
        lastIndex = start + match[0].length
    }

    if (lastIndex < attribution.length) {
        parts.push({ kind: 'text', text: attribution.slice(lastIndex) })
    }

    return parts
}
