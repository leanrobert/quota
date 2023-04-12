import { createSlice } from '@reduxjs/toolkit'
import { getOLT } from '../services/clients'

const clientsSlice = createSlice({
  name: 'clients',
  initialState: [],
  reducers: {
    setClients(state, action) {
      return action.payload
    }
  }
})

export const { setClients } = clientsSlice.actions

export const initializeClients = () => {
  return async dispatch => {
    const clients = await getOLT(1)
    dispatch(setClients(clients))
  }
}

export const selectNode = olt => {
  return async dispatch => {
    const clients = await getOLT(olt)
    dispatch(setClients(clients))
  }
}

export default clientsSlice.reducer