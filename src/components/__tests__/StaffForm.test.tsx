import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { wrapSelect } from '../../test-helpers/test-wrap'
import mockStore from '../../test-helpers/test-store'
import StaffForm, { StaffFormFields } from '../StaffForm'

/**
 * Render the tested component
 * @returns
 */
const setupComponent = (onSave?: (values: StaffFormFields) => void) =>
  render(
    <Provider store={mockStore}>
      <StaffForm onSave={onSave} />
    </Provider>,
    { wrapper: BrowserRouter },
  )

/**
 * Test form display
 */
describe('StaffForm display', () => {
  /**
   * Select jobtile and clear it
   */
  it('draw form with submit button disabled', async () => {
    await act(async () => {
      setupComponent()
    })

    // submit is disabled
    expect(screen.getByTestId('saveButton')).toBeDisabled()

    // select job title
    let select = wrapSelect(screen.getByTestId('jobTitleField'))
    select.choose('Yakult')
    expect(select.getText()).toEqual('Yakult')
    await select.clear()
    let error = await select.getError('Please input job title!')
    expect(error).toBeInTheDocument()

    // select tags
    select = wrapSelect(screen.getByTestId('tagsField'))
    select.choose('Alpha')
    select.choose('Gamma')
    select.choose('い')
    select.choose('お')
    expect(select.getText()?.trim()).toEqual('AlphaGammaいお')
    await select.clear()
    error = await select.getError('Please input your tags!')
    expect(error).toBeInTheDocument()

    // submit is disabled
    expect(screen.getByTestId('saveButton')).toBeDisabled()
  })
})

/**
 * Test inputs and events
 */
describe('StaffForm events', () => {
  /**
   * Fill all fields without errors
   */
  it('fill all fields', async () => {
    await act(async () => {
      setupComponent((values) => {
        // make sure submitted values are as expected
        const expected = JSON.stringify({
          name: 'Ramen',
          jobTitle: 'yakult',
          tags: ['α', 'γ', 'i', 'o'],
          notes: 'This is an important notes',
        })
        const real = JSON.stringify(values)
        expect(real).toEqual(expected)
      })
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
    await waitFor(async () => {
      expect(screen.getByTestId('saveButton')).toBeEnabled()
    })

    // submit data
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      userEvent.click(screen.getByTestId('saveButton'))
    })
  })
})
