import { configureStore } from '@reduxjs/toolkit'
import clientsReducer from './reducers/clientsReducer'
import selectedReducer from './reducers/selectedReducer'
import loginReducer from './reducers/loginReducer'
import monthsReducer from './reducers/monthReducer'

const store = configureStore({
  reducer: {
    clients: clientsReducer,
    selected: selectedReducer,
    user: loginReducer,
    months: monthsReducer
  }
})

export default store
