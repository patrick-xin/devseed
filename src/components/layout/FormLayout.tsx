import React from 'react'
import { Header } from '../header'

type FormLayoutProps = {
  children: JSX.Element
  title: string
}

const FormLayout = ({ children, title }: FormLayoutProps) => {
  return (
    <>
      <Header />
      <div className="mx-auto mt-12 max-w-xl">
        <h1 className="my-6 text-2xl">{title}</h1>
        {children}
      </div>
    </>
  )
}

export default FormLayout
