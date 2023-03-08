import { UserModel } from '../models/UserModel'
import { mocki, typicode } from './base-api'

export const fetchUsers = async () =>
  mocki.get<UserModel[]>('/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8', {
    params: { foo: 'bar' },
  })

export const postUser = async (data: any) => typicode.post('/posts', data)
