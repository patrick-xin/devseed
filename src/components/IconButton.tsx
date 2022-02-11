import React from 'react'
import { LoadingIcon } from './icons'

type IconButtonProps = {
  children: React.ReactNode
  isLoading?: boolean
} & React.ComponentPropsWithRef<'button'>

export type Ref = HTMLButtonElement

const IconButton = React.forwardRef<Ref, IconButtonProps>(
  ({ children, isLoading, disabled: isDisabled, ...rest }, ref) => {
    const disabled = isLoading || isDisabled

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className="rounded-lg bg-black/10 p-2 transition-colors ease-linear dark:bg-white/10 dark:hover:bg-white/20"
        {...rest}
      >
        {isLoading ? <LoadingIcon /> : children}
      </button>
    )
  }
)

export default IconButton
