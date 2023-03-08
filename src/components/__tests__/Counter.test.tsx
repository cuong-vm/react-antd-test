import { configureStore } from '@reduxjs/toolkit'
import { getAllByRole, render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { rootReducer } from '../../redux/store'
import Counter from '../Counter'

const customStore = (initialCount = 0) =>
  configureStore({
    reducer: rootReducer,
    preloadedState: { counter: { value: initialCount } },
  })

const setupComponent = (initialCount = 0) =>
  render(
    <Provider store={customStore(initialCount)}>
      <Counter />
    </Provider>,
    { wrapper: BrowserRouter },
  )

it('can select count', () => {
  setupComponent(999)
  const countDiv = screen.getByTestId('countNumber')
  expect(countDiv.innerHTML).toContain('999')
  expect(countDiv.innerHTML).toEqual('Count: 999')
})

it('can increment and decrement', () => {
  const { container } = setupComponent(0)
  const countDiv = screen.getByTestId('countNumber') as HTMLDivElement
  // eslint-disable-next-line testing-library/prefer-screen-queries
  const buttons = getAllByRole(container, 'button')
  const increment = buttons[0]
  const decrement = buttons[1]
  act(() => {
    increment.click()
  })
  expect(countDiv.innerHTML).toEqual('Count: 1')
  act(() => {
    increment.click()
  })
  expect(countDiv.innerHTML).toEqual('Count: 2')
  act(() => {
    decrement.click()
    decrement.click()
  })
  expect(countDiv.innerHTML).toEqual('Count: 0')
  act(() => {
    decrement.click()
    decrement.click()
    decrement.click()
  })
  expect(countDiv.innerHTML).toEqual('Count: -3')
})
