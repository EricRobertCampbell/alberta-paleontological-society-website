import type { FossilSortingJar } from '../../content/config'

/** Total grams of matrix sorted for a session (only unsorted jars; waste jars excluded). */
export function getSessionGramsSorted(jars: Array<FossilSortingJar>): number {
    return filterUnsortedJarsForMetrics(jars).reduce((acc, jar) => {
        const jarChange = getTotalSorted(jar)
        if (jarChange > 0) {
            // Waste jar -> don't count it
            return acc
        }
        return acc + Math.abs(jarChange)
    }, 0)
}

export function filterUnsortedJarsForMetrics(
    jars: Array<FossilSortingJar>
): Array<FossilSortingJar> {
    return jars.filter((jar) => jar.type === 'unsorted')
}

// Calculate the total amount sorted (in grams) for a given jar
// Returns the weight change, where negative values mean material was sorted out (fossils found)
// and positive values mean material was added (waste jars)
export function getTotalSorted(jar: FossilSortingJar): number {
    if (
        jar.initialWeightGrams === undefined ||
        jar.finalWeightGrams === undefined
    ) {
        return 0
    }

    // Calculate change: final - initial
    // Negative = sorted out (good)
    // Positive = added to (waste jar)
    return jar.finalWeightGrams - jar.initialWeightGrams
}
