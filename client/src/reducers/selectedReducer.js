import { createSlice } from '@reduxjs/toolkit'
import { getClient } from '../services/clientGestion'

const selectedSlice = createSlice({
  name: 'selected',
  initialState: null,
  reducers: {
    setSelected(state, action) {
      return action.payload
    }
  }
})

export const { setSelected } = selectedSlice.actions

export const setSelectedClient = (cus, consumo) => {
  return async dispatch => {
    const client = await getClient(cus)
    dispatch(setSelected({ client, consumo, nombre: cus }))
  }
}

export default selectedSlice.reducer