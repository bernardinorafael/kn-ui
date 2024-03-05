import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
	component: HomePage,
	async beforeLoad({ navigate }) {
		await navigate({ to: '/products' })
	},
})

function HomePage() {
	return (
		<>
			<div />
		</>
	)
}
