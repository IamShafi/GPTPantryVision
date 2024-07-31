import React from 'react'

const Layout = ({ children}: { children: React.ReactNode}) => {
  return (
    <main className=''>
      <div>{children}</div>
    </main>
  )
}

export default Layout
