import { forwardRef } from 'react'
import { LoadingIcon } from './icons'

type ButtonProps = {
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'red' | 'green'
  type?: 'button' | 'submit'
  isLoading?: boolean
} & React.ComponentPropsWithRef<'button'>

const variants = {
  primary: 'bg-primary border border-white/10',
  red: 'hover:border-red-500 text-red-500 bg-primary border border-white/10',
  green: 'bg-primary border border-white/10 hover:border-green-700',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      type = 'button',
      disabled: buttonDisabled,
      variant = 'primary',
      isLoading,
      ...rest
    },
    ref
  ) => {
    const disabled = isLoading || buttonDisabled
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`inline-flex items-center justify-center gap-2 rounded-md p-2 text-center text-sm shadow-md transition-colors ease-linear lg:px-3 lg:text-base ${
          className ? className : ''
        } ${variants[variant]}`}
        type={type}
        {...rest}
      >
        {isLoading && <LoadingIcon />}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
