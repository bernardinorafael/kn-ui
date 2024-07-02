/**
 * Function to format an amount to a currency string
 *
 * @function
 * @param {number} amount - currency amount to be formated
 * @param {number} fractionDigits - the maximum fraction digits
 */
export function formatCurrency(amount: number, fractionDigits?: number) {
	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
		minimumFractionDigits: fractionDigits || 2,
	}).format(amount)
}
