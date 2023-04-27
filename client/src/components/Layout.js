import React from 'react'

const Layout = ({ children, className = '' }) => {
  return (
    <div className={`w-full h-full inline-block p-8 xl:p-32 lg:p-24 md:p-16 sm:p-12  ${className}`}>
      {children}
    </div>
  )
}

export default Layout
