import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logIn } from '../reducers/loginReducer'
import logo from '../assets/images/favicon.png'
import Layout from './Layout'

const Login = () => {
  const dispatch = useDispatch()
  const errorMessage = useSelector(({ user }) => user?.errorMessage)
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(logIn(user, pass))
    setPass('')
    setUser('')
  }

  return (
    <Layout>
      <div className='flex flex-col items-center justify-center gap-3'>
        <img alt='quota' src={logo} className='w-[6%] h-[6%] hidden md:block' />
        <h1 className='mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl'>
          <span className='text-transparent bg-clip-text bg-gradient-to-br to-sky-300 from-blue-700'>Quota</span>
        </h1>
        {errorMessage && <div className='bg-red-300 text-red-800 rounded-full py-2 px-4 mb-4'>{errorMessage}</div>}
      </div>

      <form onSubmit={handleSubmit}>
        <div className='w-full mx-auto md:w-3/4 lg:w-1/2'>
          <div className='mb-6'>
            <label htmlFor='user' className='block mb-2 text-sm font-medium text-gray-900'>Username</label>
            <input type='text' required id='user' placeholder='Enter username' value={user} onChange={e => setUser(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5' />
          </div>
          <div id='formPass' className='py-2'>
            <label htmlFor='password'>Password</label>
            <input type='password' required id='password' placeholder='Enter password' value={pass} onChange={e => setPass(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5' />
          </div>
          <button type='submit' className='mx-auto block text-white bg-gradient-to-r from-blue-700 via-blue-500 to-sky-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'>
            Log In
          </button>
        </div>
      </form>
    </Layout>
  )
}

export default Login
