import type React from "react"

type FormErrorProps = React.ComponentProps<"p">

export function FormError(props: FormErrorProps) {
	return (
		<p
			role="status"
			className="-mt-1 font-medium text-red-700 text-xs dark:text-red-700"
			{...props}
		/>
	)
}
