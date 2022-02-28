import cn from 'classnames'
import Link from 'next/link'
enum BadgeVariant {
  'purple',
  'green',
  'yellow',
  'default',
  'blue',
}

type BadgeProps = {
  variant?: keyof typeof BadgeVariant
  name: string
  size?: 'sm' | 'md' | 'lg'
}

const Badge = ({ name, variant = 'default', size = 'md' }: BadgeProps) => {
  return (
    <Link href={`/m/c/${name}`}>
      <a
        className={cn('inline-block w-fit rounded-md text-xs dark:text-white', [
          variant === 'purple' && ['bg-purple-500'],
          variant === 'green' && ['bg-green-500'],
          variant === 'yellow' && ['bg-yellow-500'],
          variant === 'default' && ['bg-black/10 dark:bg-white/10'],
          variant === 'blue' && ['bg-blue-500'],
          size === 'sm' && ['py-0.5 px-2'],
          size === 'md' && ['py-2 px-2.5'],
          size === 'lg' && ['py-2.5 px-3'],
        ])}
      >
        {name}
      </a>
    </Link>
  )
}
export default Badge
