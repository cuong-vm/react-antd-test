import { setError, setTodos } from '../redux/slices/todos'
import { TodoModel } from '../models/TodoModel'
import { typicode } from './base-api'

export const fetchTodos = () => async (dispatch: any) => {
  typicode
    .get<TodoModel[]>('/todos')
    .then(({ data }) => {
      dispatch(setTodos(data))
    })
    .catch((error) => {
      dispatch(setError(error))
    })
}
