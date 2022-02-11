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
}

const Badge = ({ name, variant = 'default' }: BadgeProps) => {
  return (
    <Link href={`/m/c/${name}`}>
      <a
        className={cn('w-fit rounded-md py-0.5 px-2 text-xs text-white', [
          variant === 'purple' && ['bg-purple-500'],
          variant === 'green' && ['bg-green-500'],
          variant === 'yellow' && ['bg-yellow-500'],
          variant === 'default' && ['bg-white/10'],
          variant === 'blue' && ['bg-blue-500'],
        ])}
      >
        {name}
      </a>
    </Link>
  )
}
export default Badge
