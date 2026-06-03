export function getVisibleAlertBatchNumber(
    composition: string | null | undefined,
    batchNumber: string | number | null | undefined
): string | null {
    const normalizedBatchNumber = String(batchNumber ?? "").trim();

    if (!normalizedBatchNumber) {
        return null;
    }

    const normalizedComposition = String(composition ?? "").toLowerCase();

    return normalizedComposition.includes(normalizedBatchNumber.toLowerCase())
        ? null
        : normalizedBatchNumber;
}
