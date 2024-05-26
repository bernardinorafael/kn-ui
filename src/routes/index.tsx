import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: HomePage,
	async beforeLoad({ navigate }) {
		await navigate({ to: "/dashboard" });
	},
});

function HomePage() {
	return (
		<div>
			<h1>under construction</h1>
		</div>
	);
}
