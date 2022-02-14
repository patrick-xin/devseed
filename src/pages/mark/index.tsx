import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import {
  InfiniteData,
  InitialDataFunction,
  useInfiniteQuery,
} from 'react-query'
import { Listbox } from '@headlessui/react'

import { Bookmark, Header, Badge } from '@/components'
import { CheckIcon, LoadingIcon, SelectorIcon } from '@/components/icons'

import { useUserLikes, useUserMarks } from '@/lib/hooks'
import { API_BASE_URL, getMarks } from '@/services/api'
import prisma from '@/lib/prisma'

import type { Mark } from '@/lib/types'
import type { GetStaticProps } from 'next'
import type { Tag } from '@prisma/client'

type GroupResponse = { nextId?: string; marks: Mark[] }

type MarksPageProps = {
  initialData:
    | InfiniteData<GroupResponse>
    | InitialDataFunction<InfiniteData<GroupResponse>>
    | undefined
  tags: Tag[]
}
const options = ['asc', 'desc']

export default function MarksPage({ initialData, tags }: MarksPageProps) {
  const { inView, ref } = useInView()
  const { userMarks } = useUserMarks()
  const { userLikes } = useUserLikes()
  const [order, setOrder] = useState(options[1])

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<GroupResponse>(
      ['marks', order],
      async ({ pageParam = '' }) => {
        const data = await fetch(
          `${API_BASE_URL}/api/mark?cursor=${pageParam}&order=${order}`
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
  }, [inView])

  return (
    <div className="mx-auto max-w-6xl">
      <Header />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h4 className="text-lg text-purple-600">Popular tags</h4>
          <div className="flex gap-4">
            {tags.map((tag, index) => (
              <Badge key={index} name={tag.name} />
            ))}
          </div>
        </div>
        <Listbox value={order} onChange={setOrder}>
          <div className="relative w-48">
            <Listbox.Button className="relative w-full cursor-default rounded-lg border border-white/10 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none">
              <span className="block truncate">{order}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <SelectorIcon />
              </span>
            </Listbox.Button>
            <div>
              <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-50 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-primary sm:text-sm">
                {options.map((type) => (
                  <Listbox.Option
                    key={type}
                    className={({ active }) =>
                      `${active ? 'dark:bg-white/10' : ''}
                          relative cursor-default select-none py-2 pl-10 pr-4`
                    }
                    value={type}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`${
                            selected ? 'font-medium' : 'font-normal'
                          } block truncate`}
                        >
                          {type}
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
      {data?.pages?.map((group, i) => (
        <div
          key={i}
          className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {group.marks.map((mark) => (
            <Bookmark
              key={mark.id}
              bookmark={mark}
              isOwner={userMarks?.includes(mark.id)}
              hasLiked={userLikes?.includes(mark.id)}
            />
          ))}
        </div>
      ))}
      {isFetchingNextPage && (
        <div className="flex w-full justify-center">
          <LoadingIcon />
        </div>
      )}
      <div
        className="mx-auto flex max-w-6xl justify-center opacity-0"
        ref={ref}
      />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const initialData = await getMarks({ pageParam: '' })

    const tags = await prisma.tag.findMany({
      orderBy: { marks: { _count: 'desc' } },
      take: 3,
      select: {
        id: true,
        name: true,
      },
    })
    return {
      props: {
        initialData,
        tags,
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
