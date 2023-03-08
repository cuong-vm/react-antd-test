/**
 * Untility functions for Ant Design framework
 */
import { findAllByLabelText, findByLabelText, findByText } from '@testing-library/dom'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'

/**
 * Fire click event on an element
 * @param element
 */
function click(element: Element | null) {
  if (!element) {
    throw new TypeError(`Unable to fire click event on element: ${element}`)
  }
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    userEvent.click(element)
  })
}

/**
 * Wrapper for antd's component
 */
class ElementWrapper {
  protected me: HTMLElement

  constructor(elementOrTestId: HTMLElement | string) {
    this.me =
      elementOrTestId instanceof HTMLElement ? elementOrTestId : screen.getByTestId(elementOrTestId)
  }

  getText() {
    return this.me.textContent
  }

  async getError(message: string) {
    // eslint-disable-next-line testing-library/no-node-access
    const item = this.me.closest('.ant-form-item-control')?.parentElement as HTMLElement
    // eslint-disable-next-line testing-library/prefer-screen-queries
    return findByText(item, message)
  }

  click() {
    click(this.me)
  }

  async clear() {
    try {
      // eslint-disable-next-line testing-library/prefer-screen-queries
      const closeIcon = await findByLabelText(this.me, 'close-circle')
      click(closeIcon)
      return true
    } catch (err) {
      return false
    }
  }
}

/**
 * Wrapper for antd's select component
 */
class SelectWrapper extends ElementWrapper {
  private open: boolean

  constructor(elementOrTestId: HTMLElement | string) {
    super(elementOrTestId)
    this.open = false
  }

  click() {
    // eslint-disable-next-line testing-library/no-node-access
    click(this.me.firstElementChild)
    this.open = !this.open
  }

  async clear() {
    const done = await super.clear()
    if (done) return true
    try {
      // eslint-disable-next-line testing-library/prefer-screen-queries
      const closeIcons = await findAllByLabelText(this.me, 'close')
      closeIcons.forEach(click)
      return true
    } catch (err) {
      return false
    }
  }

  choose(label: string) {
    if (!this.open) {
      this.click()
    }
    const option = screen.getByText(label)
    expect(option).toBeInTheDocument()
    click(option)
  }
}

export const wrapElement = (elementOrTestId: HTMLElement | string) =>
  new ElementWrapper(elementOrTestId)
export const wrapSelect = (elementOrTestId: HTMLElement | string) =>
  new SelectWrapper(elementOrTestId)
