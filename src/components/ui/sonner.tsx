import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

import { cn } from "@/src/util/cn.ts"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = "system" } = useTheme()

	return (
		<Sonner
			theme={theme as ToasterProps["theme"]}
			className="toaster group"
			toastOptions={{
				classNames: {
					toast: cn(
						"group-[.toaster]:border-border group-[.toaster]:shadow-lg",
						"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground",
					),
					description: "group-[.toast]:text-muted-foreground",
					actionButton:
						"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
					cancelButton:
						"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
				},
			}}
			{...props}
		/>
	)
}

export { Toaster }
