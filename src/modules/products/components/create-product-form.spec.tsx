import { render, type RenderResult } from '@testing-library/react'
import user from '@testing-library/user-event'

import { CreateProductForm } from './create-product-form'

vi.mock('next/navigation')

window.HTMLElement.prototype.hasPointerCapture = vi.fn()
window.HTMLElement.prototype.scrollIntoView = vi.fn()

describe('create product form', () => {
  let rendered: RenderResult

  beforeEach(() => {
    rendered = render(<CreateProductForm />)
  })

  it('should render the components correctly', async () => {
    expect(rendered.getAllByRole('textbox')).toHaveLength(6)
    expect(rendered.getAllByRole('combobox')).toHaveLength(2)
    expect(rendered.getAllByRole('button')).toHaveLength(1)
    expect(rendered.getAllByRole('link')).toHaveLength(1)
  })

  it('should render the inputs validations', async () => {
    await user.click(rendered.getByRole('button', { name: /cadastrar/i }))
    expect(rendered.getAllByRole('status')).toHaveLength(6)
  })

  it('should register the form', async () => {
    await user.type(rendered.getByLabelText('nome'), 'nome do produto')
    await user.type(rendered.getByLabelText('preço'), '100099')
    await user.type(rendered.getByLabelText('marca'), 'marca do produto')

    await user.click(rendered.getByRole('combobox', { name: /categoria/i }))
    await user.click(rendered.getByRole('option', { name: /calçados/i }))

    await user.type(rendered.getByLabelText('tamanho'), 'tamanho do produto')

    await user.click(rendered.getByRole('combobox', { name: /cor/i }))
    await user.click(rendered.getByRole('option', { name: /azul/i }))

    await user.type(rendered.getByLabelText('quantidade'), '1')
    await user.type(rendered.getByLabelText('observações'), 'obs test')

    await user.click(rendered.getByRole('button', { name: /cadastrar/i }))
  })
})
