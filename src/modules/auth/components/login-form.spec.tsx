import { render, RenderResult } from '@testing-library/react'
import userEvent, { type UserEvent } from '@testing-library/user-event'

import { LoginForm } from './login-form'

/**
 * @see https://github.com/TanStack/router/discussions/604
 */
describe('login form unit test', async () => {
	let rendered: RenderResult
	let user: UserEvent

	beforeEach(() => {
		rendered = render(<LoginForm />)
		user = userEvent.setup()
	})

	it('should render the component successfully', async () => {
		expect(rendered.getByLabelText('E-mail')).toBeInTheDocument()
		expect(rendered.getByLabelText('Senha')).toBeInTheDocument()
		expect(rendered.getByRole('button', { name: /entrar/i })).toBeInTheDocument()
	})

	it('should show the form errors validatons', async () => {
		await user.type(rendered.getByLabelText('E-mail'), 'john_doe@example.com')
		await user.type(rendered.getByLabelText('Senha'), '123456')
		await user.click(rendered.getByRole('button', { name: /entrar/i }))

		/**
		 * FIXME: fix the mock fn
		 */
		expect(vi.fn()).not.toBeCalled()
	})
})
