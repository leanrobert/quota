import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/images/favicon.png'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/loginReducer'

const Botonera = () => {
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(logoutUser())
  }

  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <header className='w-full py-3 font-medium flex items-center justify-between relative bg-gray-800 text-white z-10 px-8 lg:px-32 md:px-16 sm:px-12'>
      <div className='w-full flex justify-between items-center'>
        <nav className='flex items-center justify-center lg:flex'>
          <a href='/' className='flex items-center hover:text-gray-300'>
            <img src={logo} alt='Quota App' className='w-10 inline' />
            <span className='ml-4 text-2xl'>Quota</span>
          </a>
        </nav>
        <nav className='hidden md:block'>
          <Link to='/dashboards' className='mr-4 relative group hover:text-gray-300'>Dashboards</Link>
          <Link to='/clientes' className='mr-4 relative group hover:text-gray-300'>Clientes</Link>
          <Link to='/' className='mr-4 relative group hover:text-gray-300' onClick={logout}>Logout</Link>
        </nav>
      </div>

      <button onClick={handleClick} className='flex-col justify-center items-center flex md:hidden'>
        <span className={`bg-white block transition-all diration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`} />
        <span className={`bg-white block transition-all diration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-1'}`} />
        <span className={`bg-white block transition-all diration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`} />
      </button>

      {isOpen
        ? (
          <div className='min-w-[70vw] flex flex-col z-20 justify-between items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-800/75 rounded-lg backdrop-blur-md py-32' initial={{ scale: 0, opacity: 0, x: '-50%', y: '-50%' }} animate={{ scale: 1, opacity: 1 }}>
            <nav className='flex items-center flex-col justify-center'>
              <Link to='/dashboards' className='relative group text-white my-2 hover:underline' onClick={handleClick}>Dashboards</Link>
              <Link to='/clientes' className='relative group text-white my-2 hover:underline' onClick={handleClick}>Clientes</Link>
              <Link to='/' className='relative group text-white my-2 hover:underline' onClick={logout}>Logout</Link>
            </nav>
          </div>
          )
        : (
            null
          )}
    </header>
  )
}

export default Botonera
