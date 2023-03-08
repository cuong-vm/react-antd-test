import { combineReducers, configureStore } from '@reduxjs/toolkit'
import counter from './slices/counter'
import jobtitles from './slices/jobtitles'
import tags from './slices/tags'
import todos, { TodoState } from './slices/todos'
import userPost, { UserPostState } from './slices/user-post'
import users, { UsersState } from './slices/users'

export const rootReducer = combineReducers({
  counter,
  jobtitles,
  tags,
  todos,
  users,
  userPost,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const todosSelector = (state: any) => state.todos as TodoState
export const usersSelector = (state: any) => state.users as UsersState
export const userPostSelector = (state: any) => state.userPost as UserPostState

export type Store = typeof store

export type Reducer = typeof rootReducer

export type State = ReturnType<Reducer>

export type AppDispatch = typeof store.dispatch

export default store
