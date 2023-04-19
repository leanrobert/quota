import { configureStore } from '@reduxjs/toolkit'
import clientsReducer from './reducers/clientsReducer'
import selectedReducer from './reducers/selectedReducer'
import loginReducer from './reducers/loginReducer'

const store = configureStore({
  reducer: {
    clients: clientsReducer,
    selected: selectedReducer,
    user: loginReducer,
  }
})

export default store