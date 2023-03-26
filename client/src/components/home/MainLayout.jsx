import React from 'react'
import Footer from '../Footer'
import Navbar from '../Navbar'

export default function MainLayout({children}) {
  return (
    <div>
        <Navbar/>
        <div style={{minHeight:"59vh"}}>
            {children}
        </div>
        <Footer/>
    </div>
  )
}
