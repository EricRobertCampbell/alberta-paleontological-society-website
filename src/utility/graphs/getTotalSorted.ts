// Calculate the total amount sorted (in grams) for a given jar
// Returns the weight change, where negative values mean material was sorted out (fossils found)
// and positive values mean material was added (waste jars)
export function getTotalSorted(jar: {
	initialWeightGrams?: number;
	finalWeightGrams?: number;
}): number {
	if (jar.initialWeightGrams === undefined || jar.finalWeightGrams === undefined) {
		return 0;
	}
	
	// Calculate change: final - initial
	// Negative = sorted out (good)
	// Positive = added to (waste jar)
	return jar.finalWeightGrams - jar.initialWeightGrams;
}

