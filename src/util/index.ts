import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, fractionDigits?: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: fractionDigits || 2,
  }).format(amount)
}

export function createQueryString(name: string, value: string) {
  const params = new URLSearchParams()
  params.set(name, value)

  return params.toString()
}
