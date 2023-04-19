import { createSlice } from '@reduxjs/toolkit'
import { login } from '../services/user'
import { loadUser, removeUser, saveUser } from '../services/storage'

const clientsSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    logout(state, action) {
      return null
    },
    loginError(state, action) {
      return { errorMessage: action.payload }
    }
  }
})

export const { setUser, logout, loginError } = clientsSlice.actions

export const logIn = (user, pass) => {
  return async dispatch => {
    try {
      const userLog = await login({ user, pass })
      saveUser(userLog)
      dispatch(setUser(userLog))
    } catch (error) {
      const errorMessage = error.response.data.error
      dispatch(loginError(errorMessage))
      setTimeout(() => {
        dispatch(logout())
      }, 3000)
    }
  }
}

export const logoutUser = () => {
  return async dispatch => {
    removeUser()
    dispatch(logout())
  }
}

export const getUser = () => {
  return async dispatch => {
    const user = loadUser()
    dispatch(setUser(user))
  }
}

export default clientsSlice.reducer