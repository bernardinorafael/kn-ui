import type * as React from "react";

import { cn } from "@/src/util/cn";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div className={cn("w-full text-card-foreground", className)} {...props} />
	);
}

export function CardHeader({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn("flex flex-col space-y-1.5 pb-4", className)}
			{...props}
		/>
	);
}

export function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
	return (
		<h3
			className={cn(
				"text-xl font-semibold leading-none tracking-tight",
				className,
			)}
			{...props}
		/>
	);
}

export function CardDescription({
	className,
	...props
}: React.ComponentProps<"p">) {
	return (
		<p className={cn("text-sm text-muted-foreground", className)} {...props} />
	);
}

export function CardContent({
	className,
	...props
}: React.ComponentProps<"div">) {
	return <div className={cn("pt-0", className)} {...props} />;
}

export function CardFooter({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn("mt-6 flex items-center justify-end gap-3", className)}
			{...props}
		/>
	);
}
