import { render, type RenderResult } from "@testing-library/react"

import { Box } from "./box"

describe("box component test", async () => {
	let rendered: RenderResult

	beforeEach(() => {
		rendered = render(
			<Box title="my title">
				<p>my children</p>
			</Box>,
		)
	})

	it("should render the box correctly", async () => {
		expect(rendered.getByRole("heading", { level: 2 })).toBeVisible()
	})

	it("should have the heading title", async () => {
		expect(rendered.getByText("my title")).toBeVisible()
	})

	it("should render a children", async () => {
		expect(rendered.getByText("my children")).toBeVisible()
	})
})
