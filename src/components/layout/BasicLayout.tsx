import React from 'react'
import { Header } from '../header'

type BasicLayoutProps = {
  children: JSX.Element
}

const BasicLayout = ({ children }: BasicLayoutProps) => {
  return (
    <>
      <Header />
      <div className="mx-auto min-h-[calc(100vh-6rem)] max-w-6xl px-6 md:px-12">
        {children}
      </div>
    </>
  )
}

export default BasicLayout
