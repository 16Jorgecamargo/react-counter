import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counter from './Counter'

function setup() {
  const user = userEvent.setup()
  render(<Counter />)
  return {
    user,
    value: () => screen.getByLabelText('Valor atual'),
    increment: screen.getByRole('button', { name: 'Incrementar' }),
    decrement: screen.getByRole('button', { name: 'Decrementar' }),
    reset: screen.getByRole('button', { name: 'Resetar' }),
    step: screen.getByLabelText('Step'),
    min: screen.getByLabelText('Mínimo'),
    max: screen.getByLabelText('Máximo'),
  }
}

async function typeInto(user, input, value) {
  await user.clear(input)
  if (value !== '') await user.type(input, value)
}

describe('Counter', () => {
  it('starts at 0', () => {
    const { value } = setup()
    expect(value()).toHaveTextContent('0')
  })

  it('increments by step without passing max', async () => {
    const { user, value, increment, step } = setup()
    await typeInto(user, step, '4')
    await user.click(increment)
    await user.click(increment)
    expect(value()).toHaveTextContent('8')
    await user.click(increment)
    expect(value()).toHaveTextContent('10')
    expect(increment).toBeDisabled()
  })

  it('decrements by step without going below min', async () => {
    const { user, value, decrement, step, min } = setup()
    await typeInto(user, min, '-5')
    await typeInto(user, step, '3')
    await user.click(decrement)
    expect(value()).toHaveTextContent('-3')
    await user.click(decrement)
    expect(value()).toHaveTextContent('-5')
    expect(decrement).toBeDisabled()
  })

  it('resets to 0', async () => {
    const { user, value, increment, reset } = setup()
    await user.click(increment)
    await user.click(increment)
    await user.click(reset)
    expect(value()).toHaveTextContent('0')
  })

  it('resets to min when min is greater than 0', async () => {
    const { user, value, reset, min, increment } = setup()
    await typeInto(user, min, '3')
    await user.click(increment)
    await user.click(reset)
    expect(value()).toHaveTextContent('3')
  })

  it('resets to max when max is lower than 0', async () => {
    const { user, value, reset, min, max } = setup()
    await typeInto(user, min, '-10')
    await typeInto(user, max, '-2')
    await user.click(reset)
    expect(value()).toHaveTextContent('-2')
  })

  it('shows an error and blocks actions when step is not greater than 0', async () => {
    const { user, increment, decrement, step } = setup()
    await typeInto(user, step, '0')
    expect(screen.getByRole('alert')).toHaveTextContent('O step deve ser maior que 0.')
    expect(increment).toBeDisabled()
    expect(decrement).toBeDisabled()
  })

  it('shows an error when min is greater than max', async () => {
    const { user, increment, min } = setup()
    await typeInto(user, min, '20')
    expect(screen.getByRole('alert')).toHaveTextContent('O mínimo deve ser menor ou igual ao máximo.')
    expect(increment).toBeDisabled()
  })

  it('adjusts count when max drops below it', async () => {
    const { user, value, increment, step, max } = setup()
    await typeInto(user, step, '5')
    await user.click(increment)
    await user.click(increment)
    expect(value()).toHaveTextContent('10')
    await typeInto(user, max, '7')
    expect(value()).toHaveTextContent('7')
  })

  it('adjusts count when min rises above it', async () => {
    const { user, value, min } = setup()
    await typeInto(user, min, '4')
    expect(value()).toHaveTextContent('4')
  })

  it('handles decimal steps without floating point drift', async () => {
    const { user, value, increment, step } = setup()
    await typeInto(user, step, '0.1')
    await user.click(increment)
    await user.click(increment)
    await user.click(increment)
    expect(value()).toHaveTextContent('0.3')
  })
})
