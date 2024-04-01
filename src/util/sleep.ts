/**
 * Helper to forcing a loading state
 *
 * @function
 * @param {number} timeInMiliSeconds - time to be awaited
 */
export async function sleep(timeInMiliSeconds?: number) {
	await new Promise((resolve) => setTimeout(resolve, timeInMiliSeconds || 500))
}
