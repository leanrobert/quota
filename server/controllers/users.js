const jwt = require('jsonwebtoken')
const usersRouter = require('express').Router()

const dbUsers = [
  { user: 'lrobert', pass: process.env.LEAN_PASS },
  { user: 'gguerra', pass: process.env.GUERRA_PASS },
  { user: 'alopez', pass: process.env.LOPEZ_PASS },
]

usersRouter.post('/', (req, res) => {
  const { user, pass } = req.body
  const result = dbUsers.find(obj => obj.user === user)

  if(!result) {
    return res.status(401).json({ error: 'Incorrect username or password' })
  }

  const passCorrect = result === null ? false : pass === result.pass

  if(!passCorrect) {
    return res.status(401).json({ error: 'Incorrect username or password' })
  }

  const userForToken = {
    user: result.user
  }

  const token = jwt.sign(userForToken, process.env.SECRET)
  res.status(200).send({ token, user: result.user })
})

module.exports = usersRouter