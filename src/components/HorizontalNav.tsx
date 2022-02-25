import { useRouter } from 'next/router'
import React from 'react'
import { Button, ButtonLink } from './buttons'

const HorizontalNav = () => {
  const router = useRouter()
  return (
    <nav>
      <ul className="flex">
        <li>
          <ButtonLink href="/mark">
            <span
              className={`${
                router.asPath.endsWith('mark')
                  ? 'underline decoration-green-600 decoration-2 underline-offset-8'
                  : 'dark:text-grey'
              }`}
            >
              Newest
            </span>
          </ButtonLink>
        </li>
        <li>
          <ButtonLink href="/trending">
            <span
              className={`${
                router.asPath.endsWith('trending')
                  ? 'underline decoration-green-600 decoration-2 underline-offset-8 '
                  : 'dark:text-grey'
              }`}
            >
              Trending
            </span>
          </ButtonLink>
        </li>
        <li>
          <Button
            onClick={() => {
              router.push({
                pathname: '/trending',
              })
            }}
          >
            Newest
          </Button>
        </li>
        <li>
          <Button
            onClick={() => {
              router.push(
                {
                  pathname: '/trending',
                  query: {
                    q: 'saved',
                  },
                },
                undefined,
                { shallow: true }
              )
            }}
          >
            Saved most
          </Button>
        </li>
        <li>
          <Button
            onClick={() => {
              router.push(
                {
                  pathname: '/trending',
                  query: {
                    q: 'comments',
                  },
                },
                undefined,
                { shallow: true }
              )
            }}
          >
            Comments most
          </Button>
        </li>
        <li>
          <Button
            onClick={() => {
              router.push(
                {
                  pathname: '/trending',
                  query: {
                    q: 'liked',
                  },
                },
                undefined,
                { shallow: true }
              )
            }}
          >
            Most Liked
          </Button>
        </li>
      </ul>
    </nav>
  )
}

export default HorizontalNav
