import React from "react"

type FormErrorProps = React.ComponentProps<"p">

export function FormError(props: FormErrorProps) {
	return (
		<p
			role="status"
			className="-mt-1 text-xs font-medium text-red-700 dark:text-red-700"
			{...props}
		/>
	)
}
