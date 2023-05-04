import { createSlice } from '@reduxjs/toolkit'
import { getMonths } from '../services/months'

const monthsSlice = createSlice({
  name: 'months',
  initialState: [],
  reducers: {
    setMonthData (state, action) {
      return action.payload
    }
  }
})

export const { setMonthData } = monthsSlice.actions

export const initializeMonths = () => {
  return async dispatch => {
    const months = await getMonths()
    dispatch(setMonthData(months))
  }
}

export default monthsSlice.reducer
