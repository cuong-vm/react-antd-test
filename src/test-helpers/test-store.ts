import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from '../redux/store'
import { jobtitles, tags } from './test-data'

const mockState = {
  jobtitles,
  tags,
}

const mockStore = configureStore({
  reducer: rootReducer,
  preloadedState: mockState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default mockStore
