import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { parseError } from '../../helpers/utils'
import { postUser } from '../../services/user-api'

export interface UserPostState {
  loading: boolean
  error: any
  result: any
}

const initialState: UserPostState = {
  loading: false,
  error: null,
  result: null,
}

const saveUser = createAsyncThunk('users/post', async (data: any, { rejectWithValue }) => {
  try {
    return await postUser(data)
  } catch (err) {
    return rejectWithValue(parseError(err))
  }
})

const userSlice = createSlice({
  name: 'userPost',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(saveUser.pending, (state) => {
      state.loading = true
    })
    builder.addCase(saveUser.fulfilled, (state) => {
      state.loading = false
      state.result = 'OK'
    })
    builder.addCase(saveUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  },
})

export { saveUser }

export default userSlice.reducer
