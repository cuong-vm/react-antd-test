import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { HttpError } from '../../exceptions/HttpError'
import { getStatusText, mockApi } from '../../test-helpers/api-mock'
import * as TestData from '../../test-helpers/test-data'
import mockStore from '../../test-helpers/test-store'
import { wrapSelect } from '../../test-helpers/test-wrap'
import { mocki, typicode } from '../../services/base-api'
import UserPage from '../UserPage'

/**
 * Render the tested component
 * @returns
 */
const setupComponent = () =>
  render(
    <Provider store={mockStore}>
      <UserPage />
    </Provider>,
    { wrapper: BrowserRouter },
  )

/**
 * Test result list
 */
describe('UserPage list', () => {
  /**
   * Load users OK
   */
  it('load users', async () => {
    const { users } = TestData
    mockApi(mocki)
      .onGet('/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8', {
        params: { foo: 'bar' },
      })
      .reply(users)

    await act(async () => {
      setupComponent()
    })

    // user list is displayed properly
    expect(screen.getByText(`User List (${users.length})`)).toBeInTheDocument()
    users.forEach(({ name, city }) => {
      expect(screen.getByText(`${name} from ${city}`)).toBeInTheDocument()
    })

    // staff form is displayed
    const staffForm = await screen.findByTestId('staffForm')
    expect(staffForm).toBeInTheDocument()
  })

  /**
   * Load users failed
   */
  it('load users error 404', async () => {
    mockApi(mocki)
      .onGet('/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8')
      .reply(404, (status) => new HttpError(status, getStatusText(status)))

    await act(async () => {
      setupComponent()
    })

    // error message is shown
    await waitFor(async () => {
      expect(screen.getByText(getStatusText(404))).toBeInTheDocument()
    })
  })
})

/**
 * Test user CRUD
 */
describe('UserPage CRUD', () => {
  /**
   * Create user OK
   */
  it('create user', async () => {
    const { ok, users } = TestData
    mockApi(mocki).onGet('/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8').reply(users)
    mockApi(typicode).onPost('/posts').reply(ok)

    await act(async () => {
      setupComponent()
    })

    // submit is disabled
    expect(screen.getByTestId('saveButton')).toBeDisabled()

    // input name
    const name = screen.getByTestId('nameField')
    userEvent.type(name, 'Ramen')

    // submit is disabled
    await waitFor(async () => {
      expect(screen.getByTestId('saveButton')).toBeDisabled()
    })

    // select job title
    let select = wrapSelect(screen.getByTestId('jobTitleField'))
    select.choose('Yakult')
    expect(select.getText()).toEqual('Yakult')

    // select tags
    select = wrapSelect(screen.getByTestId('tagsField'))
    select.choose('Alpha')
    select.choose('Gamma')
    select.choose('い')
    select.choose('お')

    // input notes
    const notes = screen.getByTestId('notesField')
    userEvent.type(notes, 'This is an important notes')

    // submit is enabled
    expect(screen.getByTestId('saveButton')).toBeEnabled()

    // submit data
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      userEvent.click(screen.getByTestId('saveButton'))
    })
    await waitFor(async () => {
      expect(screen.getByText('OK')).toBeInTheDocument()
    })
  })

  /**
   * Create user failed
   */
  it('create user error 500', async () => {
    const { users } = TestData
    mockApi(mocki).onGet('/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8').reply(users)
    mockApi(typicode)
      .onPost('/posts')
      .reply(500, (status) => new HttpError(status, getStatusText(status)))

    await act(async () => {
      setupComponent()
    })

    // input name
    const name = screen.getByTestId('nameField')
    userEvent.type(name, 'Ramen')

    // select job title
    let select = wrapSelect(screen.getByTestId('jobTitleField'))
    select.choose('Yakult')
    expect(select.getText()).toEqual('Yakult')

    // select tags
    select = wrapSelect(screen.getByTestId('tagsField'))
    select.choose('Alpha')
    select.choose('Gamma')
    select.choose('い')
    select.choose('お')

    // input notes
    const notes = screen.getByTestId('notesField')
    userEvent.type(notes, 'This is an important notes')

    // submit is enabled
    expect(screen.getByTestId('saveButton')).toBeEnabled()

    // submit data
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      userEvent.click(screen.getByTestId('saveButton'))
    })

    // error message is shown
    await waitFor(async () => {
      expect(screen.getByText(getStatusText(500))).toBeInTheDocument()
    })
  })
})
