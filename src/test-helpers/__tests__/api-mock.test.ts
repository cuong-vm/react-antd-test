import { act } from '@testing-library/react'
import { HttpError } from '../../exceptions/HttpError'
import { typicode } from '../../services/base-api'
import { getStatusText, mockApi } from '../api-mock'

type IUser = {
  id?: number
  name: string
  age: number
  nationality: string
  job: string
}

const createUser = (id?: number) => ({
  id,
  name: 'Olivia Isabel Rodrigo',
  age: 20,
  nationality: 'American',
  job: 'singer-songwriter and actress',
})

describe('API mock', () => {
  /**
   * Call GET request
   */
  it('GET request', async () => {
    const user = createUser(5)
    const user6 = createUser(6)
    mockApi(typicode)
      .onGet('/api/users/5')
      .reply(user)
      .onGet('/api/users/6')
      .reply(user)
      .onGet('/api/users/6')
      .reply(user6)
      .onGet('/api/users/8', {
        params: { foo: 'bar' },
      })
      .reply(200, () => user)
    await act(async () => {
      const { status, statusText, data } = await typicode.get<IUser>('/api/users/5?q=keyword')
      expect(status).toEqual(200)
      expect(statusText).toEqual('OK')
      expect(data).toEqual(user)
    })
    await act(async () => {
      const { status, data } = await typicode.get<IUser>('/api/users/6', {
        params: { xyz: 'bar' },
      })
      expect(status).toEqual(200)
      expect(data).toEqual(user6)
    })
    await act(async () => {
      const { status, data } = await typicode.get<IUser>('/api/users/8', {
        params: { foo: 'bar' },
      })
      expect(status).toEqual(200)
      expect(data).toEqual(user)
    })
    await act(async () => {
      const { status, data } = await typicode.get<IUser>('/api/users/8', {
        params: { foo2: 'bar' },
      })
      expect(status).toEqual(404)
      expect(data).toBeUndefined()
    })
  })

  /**
   * Call POST request
   */
  it('POST request', async () => {
    const user = createUser()
    mockApi(typicode).onPost('/api/users').reply({ id: 25 })
    const {
      status,
      statusText,
      data: { id },
    } = await typicode.post('/api/users', user)
    expect(status).toEqual(200)
    expect(statusText).toEqual('OK')
    expect(id).toEqual(25)
  })

  /**
   * Call PUT request
   */
  it('PUT request', async () => {
    const user = createUser()
    mockApi(typicode).onPut('/api/users/3').reply({ id: 25 })
    const {
      status,
      statusText,
      data: { id },
    } = await typicode.put('/api/users/3', user)
    expect(status).toEqual(200)
    expect(statusText).toEqual('OK')
    expect(id).toEqual(25)
  })

  /**
   * Call DELETE request
   */
  it('DELETE request', async () => {
    mockApi(typicode).onDelete('/api/users/5').reply(200)
    const { status, statusText } = await typicode.delete('/api/users/5')
    expect(status).toEqual(200)
    expect(statusText).toEqual('OK')
  })

  /**
   * Check HTTP status
   */
  it('HTTP status', async () => {
    const user = createUser()
    mockApi(typicode)
      .onGet('/api/users/5')
      .reply(200)
      .onGet('/api/offices')
      .reply(501)
      .onGet('/api/menu')
      .reply(504)
      .onPost('/api/tasks')
      .reply(500)
      .onPut('/api/tasks/0')
      .reply(400)
      .onPut('/api/tasks/1')
      .reply(401)
      .onPut('/api/tasks/2')
      .reply(403)
      .onPatch('/api/users/30')
      .reply(404, (status) => new HttpError(status, getStatusText(status)))

    await act(async () => {
      const { status } = await typicode.get('/api/users/5')
      expect(status).toEqual(200)
    })
    await act(async () => {
      const { status } = await typicode.get('/api/offices')
      expect(status).toEqual(501)
    })
    await act(async () => {
      const { status, statusText } = await typicode.get('/api/menu')
      expect(status).toEqual(504)
      expect(statusText).toEqual(getStatusText(504))
    })
    await act(async () => {
      const { status } = await typicode.get('/api/users/1')
      expect(status).toEqual(404)
    })
    await act(async () => {
      const { status } = await typicode.post('/api/users', user, {
        params: {},
      })
      expect(status).toEqual(404)
    })
    await act(async () => {
      const { status } = await typicode.post('/api/tasks')
      expect(status).toEqual(500)
    })
    await act(async () => {
      const { status } = await typicode.put('/api/tasks/0')
      expect(status).toEqual(400)
    })
    await act(async () => {
      const { status } = await typicode.put('/api/tasks/1')
      expect(status).toEqual(401)
    })
    await act(async () => {
      const { status } = await typicode.put('/api/tasks/2')
      expect(status).toEqual(403)
    })
    await act(async () => {
      const { status } = await typicode.put('/api/users/5')
      expect(status).toEqual(404)
    })
    await act(async () => {
      const { status } = await typicode.delete('/api/users/5')
      expect(status).toEqual(404)
    })
    await act(async () => {
      const { status } = await typicode.patch('/api/users/5')
      expect(status).toEqual(404)
    })
    await act(async () => {
      const { status } = await typicode.patch('/api/users/5')
      expect(status).toEqual(404)
    })
    await act(async () => {
      try {
        await typicode.patch('/api/users/30')
      } catch (err) {
        expect(err).toBeInstanceOf(HttpError)
      }
    })
  })
})
