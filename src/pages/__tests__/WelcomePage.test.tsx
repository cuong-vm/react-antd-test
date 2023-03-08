import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import WelcomePage from '../WelcomePage'

const setupComponent = () => render(<WelcomePage />, { wrapper: BrowserRouter })

/**
 * Test Welcome page
 */
describe('WelcomePage', () => {
  it('render without crashing', () => {
    setupComponent()
    expect(screen.getByText('Welcome')).toBeInTheDocument()
  })
})
