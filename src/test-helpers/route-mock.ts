/**
 * Handles redirect event. You should use expect(screen.getByText(`Redirected to ${to}`)).toBeInTheDocument() to check route redirection.
 *
 * Example: expect(screen.getByText(`Redirected to /home`)).toBeInTheDocument()
 */
export const mockRouter = () => {
  jest.mock('react-router-dom', () => ({
    Redirect: jest.fn(({ to }) => `Redirected to ${to}`),
    useLocation: () => ({
      pathname: 'http://localhost:3000/',
    }),
  }))
}
