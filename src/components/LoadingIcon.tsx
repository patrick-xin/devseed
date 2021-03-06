import cn from 'classnames'

type LoadingIconProps = {
  size?: 'sm' | 'md' | 'lg' | 'xs'
}

const LoadingIcon = ({ size = 'md' }: LoadingIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn('animate-spin fill-current text-gray-700 dark:text-white', {
        'h-6 w-6': size === 'md',
        'h-8 w-8': size === 'lg',
        'h-4 w-4': size === 'sm',
        'h-3 w-3': size === 'xs',
      })}
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="2" x2="12" y2="6"></line>
      <line x1="12" y1="18" x2="12" y2="22"></line>
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
      <line x1="2" y1="12" x2="6" y2="12"></line>
      <line x1="18" y1="12" x2="22" y2="12"></line>
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
    </svg>
  )
}

export default LoadingIcon
