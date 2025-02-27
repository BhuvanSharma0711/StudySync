'use client'

import React from 'react'
import Navigationbar from '../Navigationbar'
import Footer from '../footer'

function PublicLayout({children} : {children : React.ReactNode} ) {
  return (
    <div>
        <Navigationbar></Navigationbar>
        <main>{children}</main>
        <Footer></Footer>
    </div>
  )
}

export default PublicLayout