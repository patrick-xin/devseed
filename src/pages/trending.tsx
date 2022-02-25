import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import {
  InfiniteData,
  InitialDataFunction,
  useInfiniteQuery,
} from 'react-query'

import { MarkLoader, SeedMark } from '@/components/mark'
import { LoadingIcon } from '@/components/icons'

import { useUserPreference } from '@/lib/hooks'
import { API_BASE_URL, getTrendingMarks } from '@/services/api'

import type { Mark } from '@/lib/types'
import type { GetStaticProps } from 'next'
import type { Tag } from '@prisma/client'
import BasicLayout from '@/components/layout/BasicLayout'
import { HorizontalNav } from '@/components'
import { useRouter } from 'next/router'

type GroupResponse = { nextId?: string; marks: Mark[] }

type MarksPageProps = {
  initialData:
    | InfiniteData<GroupResponse>
    | InitialDataFunction<InfiniteData<GroupResponse>>
    | undefined
  tags: Tag[]
}

export default function TrendingPage({ initialData }: MarksPageProps) {
  const { inView, ref } = useInView()
  const router = useRouter()

  const { userPreference } = useUserPreference()
  //const [orderBy, setOrderBy] = useState('newest')
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<GroupResponse>(
      ['marks', 'trending', router.query.q],
      async ({ pageParam = '' }) => {
        const data = await fetch(
          `${API_BASE_URL}/api/mark/trending?cursor=${pageParam}&orderBy=${router.query.q}`
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

  if (!data || !initialData)
    return (
      <div className="flex h-screen w-screen items-center justify-center overflow-hidden bg-gray-50 dark:bg-black/70">
        <LoadingIcon />
      </div>
    )
  return (
    <BasicLayout>
      <div>
        <HorizontalNav />

        {data &&
          data.pages?.map((group, i) => (
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
          ))}
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
    const initialData = await getTrendingMarks({ pageParam: '' })

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
