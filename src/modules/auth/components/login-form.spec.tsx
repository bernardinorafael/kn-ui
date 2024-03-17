import { render, RenderResult } from '@testing-library/react'

// import userEvent, { type UserEvent } from '@testing-library/user-event'

import { LoginForm } from './login-form'

/**
 * @see https://github.com/TanStack/router/discussions/604
 */
describe('login form unit test', async () => {
	let rendered: RenderResult
	// let user: UserEvent

	beforeEach(() => {
		rendered = render(<LoginForm />)
		// user = userEvent.setup()
	})

	it('should render the component successfully', async () => {
		expect(rendered.getByLabelText('E-mail')).toBeInTheDocument()
		expect(rendered.getByLabelText('Senha')).toBeInTheDocument()
		expect(rendered.getByRole('button', { name: /entrar/i })).toBeInTheDocument()
	})
})
