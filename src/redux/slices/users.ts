import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { parseError } from '../../helpers/utils'
import { UserModel } from '../../models/UserModel'
import { fetchUsers } from '../../services/user-api'

export interface UsersState {
  loading: boolean
  error: any
  users: UserModel[] | null
}

const initialState: UsersState = {
  loading: false,
  error: null,
  users: null,
}

const loadUsers = createAsyncThunk('users/get', async (data, { rejectWithValue }) => {
  try {
    const { data } = await fetchUsers()
    return data
  } catch (err) {
    return rejectWithValue(parseError(err))
  }
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadUsers.pending, (state) => {
      state.loading = true
    })
    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.loading = false
      state.users = action.payload
    })
    builder.addCase(loadUsers.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  },
})

export { loadUsers }

export default usersSlice.reducer
