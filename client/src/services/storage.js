const KEY = 'userQuota'

const saveUser = user => {
  localStorage.setItem(KEY, JSON.stringify(user))
}

const loadUser = () => {
  return JSON.parse(window.localStorage.getItem(KEY))
}

const removeUser = () => {
  localStorage.removeItem(KEY)
}

export {
  saveUser,
  loadUser,
  removeUser
}