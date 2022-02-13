import Link, { LinkProps } from 'next/link'
import * as React from 'react'

import cn from 'classnames'

export type ButtonLinkProps = {
  href: string
  children: React.ReactNode
  openNewTab?: boolean
  className?: string
  nextLinkProps?: Omit<LinkProps, 'href'>
} & React.ComponentPropsWithRef<'a'>

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ children, href, openNewTab, className, nextLinkProps, ...rest }, ref) => {
    const isNewTab =
      openNewTab !== undefined
        ? openNewTab
        : href && !href.startsWith('/') && !href.startsWith('#')

    if (!isNewTab) {
      return (
        <Link href={href} {...nextLinkProps}>
          <a
            ref={ref}
            {...rest}
            className={`inline-block rounded-md px-3 py-2 ${
              className ? className : ''
            }`}
          >
            {children}
          </a>
        </Link>
      )
    }

    return (
      <a
        ref={ref}
        target="_blank"
        rel="noopener noreferrer"
        href={href}
        {...rest}
        className={cn('cursor-newtab', className)}
      >
        {children}
      </a>
    )
  }
)

ButtonLink.displayName = 'ButtonLink'

export default ButtonLink
