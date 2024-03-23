import React from 'react'

import { Slot } from '@radix-ui/react-slot'
import { currency } from 'remask'

interface InputCurrencyProps {
	value: string
	asChild?: boolean
	children: React.ReactNode
	onChange: (value: string) => void
}

export const CurrencyInput = React.forwardRef<HTMLInputElement, InputCurrencyProps>(
	({ asChild, ...props }: InputCurrencyProps, ref) => {
		const { onChange, value, ...rest } = props

		const currencyOptions = {
			currency: 'BRL',
			locale: 'BRL',
		}

		const onChangeCurrencyValue = (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value
			const unMaskedValue = currency.unmask({ ...currencyOptions, value })

			onChange(String(unMaskedValue))
		}

		const Component = asChild ? Slot : 'input'

		return (
			<Component
				value={currency.mask({ ...currencyOptions, value: +value || 0 })}
				onChange={onChangeCurrencyValue}
				ref={ref}
				{...rest}
			/>
		)
	},
)

CurrencyInput.displayName = 'CurrencyInput'
