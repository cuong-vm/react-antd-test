// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import Schema from 'async-validator'
import { mockRouter } from './test-helpers/route-mock'
import { mockLocalStorage } from './test-helpers/storage-mock'

/**
 * Avoid global warning for 'async-validator'
 */
// eslint-disable-next-line @typescript-eslint/no-empty-function
Schema.warning = function () {}

/**
 * Match media definition to test like a browser
 * @param query
 * @returns
 */
window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
})

/**
 * Extended mocks
 */
mockLocalStorage()
// mockI18n()
mockRouter()

afterEach(() => {
  cleanup()
  jest.clearAllMocks()
  jest.restoreAllMocks()
})

afterAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  global.gc && global.gc()
})
