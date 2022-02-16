import React from 'react'

type Variant = {
  [key: string]: string
}

const variants: Variant = {
  primary:
    'dark:bg-primary bg-gray-50 border border-black/10 dark:hover:bg-white/10 dark:border-white/10',
  red: 'hover:border-red-500 text-red-500 bg-primary border border-white/10',
  green: 'bg-primary border border-white/10 hover:border-green-700',
}

type Foo = {
  red: boolean
  green: boolean
}

const createClassNames = (classes: Foo): string => {
  let classNames = ''

  Object.entries(classes).map(([key, value]) => {
    if (value) classNames += variants[key]
  })
  return classNames.trim()
}

const test = () => {
  return (
    <div>
      <Button red />
    </div>
  )
}

const Button = ({ red = false, green = false }) => {
  const result = createClassNames({ red, green })

  return <button className={result}>button</button>
}

export default test
