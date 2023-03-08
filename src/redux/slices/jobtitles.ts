import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  {
    label: 'Manager',
    options: [
      { label: 'Office Manager', value: 'office_manager' },
      { label: 'Business Manager', value: 'business_manager' },
    ],
  },
  {
    label: 'Engineer',
    options: [
      { label: 'Developer', value: 'dev' },
      { label: 'Tester', value: 'qc' },
    ],
  },
]

const jobtitlesSlice = createSlice({
  name: 'jobtitles',
  initialState,
  reducers: {},
})

export default jobtitlesSlice.reducer
