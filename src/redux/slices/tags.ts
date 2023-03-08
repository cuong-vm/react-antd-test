import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  {
    label: 'Office',
    options: [
      { label: 'Accounting', value: 'accounting' },
      { label: 'Help Desk', value: 'desk' },
    ],
  },
  {
    label: 'Sales',
    options: [
      { label: 'Client', value: 'client' },
      { label: 'Product', value: 'product' },
      { label: 'Service', value: 'service' },
    ],
  },
]

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
})

export default tagsSlice.reducer
