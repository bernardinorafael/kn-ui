export function formatCurrency(amount: number, fractionDigits?: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: fractionDigits || 2,
  }).format(amount)
}
