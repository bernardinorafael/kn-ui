import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Helper to writing css
 *
 * @function
 * @param {string[]} inputs - all the css classes
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
