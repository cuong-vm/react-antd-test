import { createSlice } from '@reduxjs/toolkit'
import { TodoModel } from './../../models/TodoModel'

export interface TodoState {
  loading: boolean
  error: any
  todos: TodoModel[] | null
}

const initialState: TodoState = {
  loading: false,
  error: null,
  todos: null,
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true
    },
    setTodos: (state, { payload }) => {
      state.loading = false
      state.error = null
      state.todos = payload
    },
    setError: (state, { payload }) => {
      state.error = payload
    },
  },
})

export const { setLoading, setTodos, setError } = todosSlice.actions

export default todosSlice.reducer
