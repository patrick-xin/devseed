import { forwardRef } from 'react'
import cn from 'classnames'

import { LoadingIcon } from '../icons'

type ButtonProps = {
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'red' | 'green' | 'naked'
  size?: 'sm' | 'md' | 'lg' | 'xs'
  type?: 'button' | 'submit'
  isLoading?: boolean
} & React.ComponentPropsWithRef<'button'>

const variants = {
  primary:
    'dark:bg-primary bg-gray-50 border border-black/10 dark:hover:bg-white/10 dark:border-white/10',
  red: 'hover:border-red-500 text-red-500 bg-primary border border-white/10',
  green: 'bg-primary border border-white/10 hover:border-green-700',
  naked: '',
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
      size = 'md',
      ...rest
    },
    ref
  ) => {
    const disabled = isLoading || buttonDisabled
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          `${
            className ? className : ''
          } inline-flex w-full items-center gap-2 rounded-md p-2 text-center shadow-md transition-colors ease-linear lg:px-3 lg:text-base ${
            variants[variant]
          }`
        )}
        type={type}
        {...rest}
      >
        {isLoading ? (
          <LoadingIcon size={size} />
        ) : (
          <div
            className={cn('flex items-center justify-start', {
              'text-xs': size === 'xs',
              'text-sm': size === 'sm',
              'text-base': size === 'md',
              'text-lg': size === 'lg',
            })}
          >
            {children}
          </div>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
