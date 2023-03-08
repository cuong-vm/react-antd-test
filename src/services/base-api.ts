import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { BASE_URL } from '../constants'
import { HttpError } from '../exceptions/HttpError'

/**
 * Check response to throw error if its status is less than 200 or greater than or equals to 300
 * @param response
 * @returns
 */
export const filterResponse = (response: AxiosResponse<any, any>) => {
  const { status, statusText } = response
  if (status < 200 || status >= 300) {
    throw new HttpError(status, statusText)
  }
  return response
}

/**
 * Setup Axios instance with interceptors
 * @param instance
 */
function setupInterceptors(instance: AxiosInstance) {
  const {
    interceptors: { request, response },
  } = instance
  request.use(
    (config) => config,
    (error) => Promise.reject(error),
  )
  response.use(filterResponse, (error) => Promise.reject(error))
  return instance
}

/**
 * API from typicode.com
 */
const typicode = setupInterceptors(
  axios.create({
    baseURL: BASE_URL.typicode,
    withCredentials: false,
    headers: {
      Accept: 'application/json',
      // 'Content-Type': 'application/json',
      Authorization: 'Bearer xyz',
    },
  }),
)

/**
 * API from mocki.io
 */
const mocki = setupInterceptors(
  axios.create({
    baseURL: BASE_URL.mocki,
    withCredentials: false,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }),
)

export { typicode, mocki }
