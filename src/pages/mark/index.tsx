import { useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import {
  InfiniteData,
  InitialDataFunction,
  useInfiniteQuery,
} from 'react-query'
import { Listbox } from '@headlessui/react'

import { MarkLoader, SeedMark } from '@/components/mark'
import { CheckIcon, SelectorIcon } from '@/components/icons'

import { useUserPreference } from '@/lib/hooks'
import { API_BASE_URL, getMarks } from '@/services/api'

import type { Mark } from '@/lib/types'
import type { GetStaticProps } from 'next'
import type { Tag } from '@prisma/client'
import BasicLayout from '@/components/layout/BasicLayout'

import { useRouter } from 'next/router'

type GroupResponse = { nextId?: string; marks: Mark[] }

type MarksPageProps = {
  initialData:
    | InfiniteData<GroupResponse>
    | InitialDataFunction<InfiniteData<GroupResponse>>
    | undefined
  tags: Tag[]
}
const options = [
  { name: 'Newest', query: 'newest' },
  { name: 'Most Saved', query: 'saved' },
  { name: 'Most Liked', query: 'liked' },
  { name: 'Most Comments', query: 'comments' },
]

export default function MarksPage({ initialData }: MarksPageProps) {
  const { inView, ref } = useInView({ rootMargin: '200px' })
  const { query, push } = useRouter()
  const [order, setOrder] = useState(options[0].query)

  const { userPreference } = useUserPreference()
  useEffect(() => {
    setOrder((query.q as string) ?? options[0].query)
  }, [query])

  const label = useMemo(() => {
    return options.filter((option) => option?.query === order)[0].name
  }, [order])

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<GroupResponse>(
      ['marks', order],
      async ({ pageParam = '' }) => {
        const data = await fetch(
          `${API_BASE_URL}/api/mark?cursor=${pageParam}&orderBy=${order}`
        )
        return data.json()
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextId ?? false,
        initialData,
      }
    )

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
    //eslint-disable-next-line
  }, [inView, hasNextPage])

  return (
    <BasicLayout>
      <div>
        <div className="mx-6 mb-6 flex items-center justify-end">
          <Listbox
            value={order}
            onChange={(val) => {
              setOrder(val)

              if (val === options[0].query) {
                push('/mark')
              } else {
                push(
                  {
                    pathname: '/mark',
                    query: {
                      q: val,
                    },
                  },
                  undefined,
                  { shallow: true }
                )
              }
            }}
          >
            <div className="relative w-48">
              <Listbox.Button className="relative w-full cursor-default rounded-lg border border-white/10 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none">
                <span className="block truncate">{label}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <SelectorIcon />
                </span>
              </Listbox.Button>
              <div>
                <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-50 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-primary sm:text-sm">
                  {options.map((option) => (
                    <Listbox.Option
                      key={option.name}
                      className={({ active }) =>
                        `${active ? 'dark:bg-white/10' : ''}
                          relative cursor-default select-none py-2 pl-10 pr-4`
                      }
                      value={option.query}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`${
                              selected ? 'font-medium' : 'font-normal'
                            } block truncate`}
                          >
                            {option.name}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3`}
                            >
                              <CheckIcon />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </div>
          </Listbox>
        </div>

        {data && data.pages ? (
          data.pages.map((group, i) => (
            <div key={i} className="mx-auto grid grid-cols-1 lg:grid-cols-2">
              {group?.marks?.map((mark) => (
                <SeedMark
                  key={mark.id}
                  bookmark={mark}
                  isOwner={userPreference?.marks?.includes(mark.id)}
                  hasLiked={userPreference?.collections?.includes(mark.id)}
                  hasVoted={userPreference?.likes.includes(mark.id)}
                />
              ))}
            </div>
          ))
        ) : (
          <div className="flex flex-wrap gap-6">
            <MarkLoader />
            <MarkLoader />
            <MarkLoader />
          </div>
        )}
        {isFetchingNextPage && (
          <div className="grid w-full grid-cols-2 gap-10 px-6">
            <MarkLoader />
            <MarkLoader />
            {/* <LoadingIcon /> */}
          </div>
        )}
        <div
          className="mx-auto flex max-w-6xl justify-center opacity-0"
          ref={ref}
        />
      </div>
    </BasicLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const initialData = await getMarks({ pageParam: '' })

    if (initialData.message) {
      return {
        redirect: {
          destination: '/500',
          permanent: false,
        },
      }
    }
    return {
      props: {
        initialData,
      },
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/500',
        permanent: false,
      },
    }
  }
}
