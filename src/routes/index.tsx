import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
	component: HomePage,
	async beforeLoad({ navigate }) {
		await navigate({ to: '/profile' })
	},
})

function HomePage() {
	return (
		<>
			<div>
				<h1>Hello</h1>
			</div>
		</>
	)
}
