import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { typicode } from '../../services/base-api'
import { mockApi } from '../../test-helpers/api-mock'
import * as TestData from '../../test-helpers/test-data'
import mockStore from '../../test-helpers/test-store'
import { wrapSelect } from '../../test-helpers/test-wrap'
import TodoPage from '../TodoPage'

/**
 * Render the tested component
 * @returns
 */
const setupComponent = () =>
  render(
    <Provider store={mockStore}>
      <TodoPage />
    </Provider>,
    { wrapper: BrowserRouter },
  )

/**
 * Test result list
 */
describe('TodoPage list', () => {
  /**
   * Load data OK
   */
  it('should get todos from API', async () => {
    const { todos } = TestData
    mockApi(typicode).onGet('/todos').reply(todos)

    await act(async () => {
      setupComponent()
    })

    // todo list is displayed properly
    expect(screen.getByText(`Todo List (${todos.length})`)).toBeInTheDocument()
    todos.forEach(({ title, completed }) => {
      expect(screen.getByText(`${completed ? '✓' : '#'} ${title}`)).toBeInTheDocument()
    })

    // staff form is displayed
    const staffForm = await screen.findByTestId('staffForm')
    expect(staffForm).toBeInTheDocument()

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
    select.choose('い')

    // input notes
    const notes = screen.getByTestId('notesField')
    userEvent.type(notes, 'Sample')

    // submit data
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      userEvent.click(screen.getByTestId('saveButton'))
    })

    // check output
    await waitFor(async () => {
      expect(screen.getByTestId('output')).toBeInTheDocument()
    })
    const expected = {
      name: 'Ramen',
      jobTitle: 'yakult',
      tags: ['α', 'i'],
      notes: 'Sample',
    }
    expect(screen.getByTestId('output').textContent).toEqual(JSON.stringify(expected, null, 2))
  })
})
