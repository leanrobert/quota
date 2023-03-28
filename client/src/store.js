import { configureStore } from '@reduxjs/toolkit'
import clientsReducer from './reducers/clientsReducer'
import selectedReducer from './reducers/selectedReducer'

const store = configureStore({
  reducer: {
    clients: clientsReducer,
    selected: selectedReducer
  }
})

export default store