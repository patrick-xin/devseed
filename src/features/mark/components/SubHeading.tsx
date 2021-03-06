import cn from 'classnames'

const SubHeading = ({
  title,
  hasMargin = true,
  size = 'md',
}: {
  title: string
  hasMargin?: boolean
  size?: 'sm' | 'md' | 'lg'
}) => {
  return (
    <div
      className={cn('text-gray-500 dark:text-[#5b5b5b]', {
        'mr-8': hasMargin,
        'm-0': !hasMargin,
        'text-xs': size === 'sm',
        'text-sm lg:text-base': size === 'md',
        'text-base lg:text-lg': size === 'lg',
      })}
    >
      {title}
    </div>
  )
}

export default SubHeading
