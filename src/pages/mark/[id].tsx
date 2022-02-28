import { BsLink } from 'react-icons/bs'

import { ButtonLink, IconButton } from '@/components/buttons'
import { Badge, SubHeading } from '@/mark/components'
import { UserAvatarWithName } from '@/user/components'

import BasicLayout from '@/components/layout/BasicLayout'
import prisma from '@/lib/prisma'

import type { GetStaticProps } from 'next'

import { capLetter, capLetters } from '@/utils'
import { format } from 'date-fns'
import { useGetMark } from '@/mark/hooks'
import { useUser } from '@/user/hooks'
import { EditIcon } from '@/components/icons'
import { useMarkFormModalStore } from '@/lib/store/modal'
import { dehydrate, QueryClient } from 'react-query'
import { getMark } from '@/mark/api'
import { Comment } from '@/comment/components'

const DetailPage = ({ id }: { id: string }) => {
  const { user } = useUser()
  const { openModal } = useMarkFormModalStore()
  const { mark, isLoadingMark } = useGetMark(id)
  console.log(mark)

  const isOwner = user?.id === mark?.authorId
  if (isLoadingMark) return <div>loading</div>
  return (
    <BasicLayout>
      {mark && (
        <div className="mx-auto max-w-2xl space-y-4 p-4">
          <div className="flex items-center justify-between">
            <h1 className="pb-4 lg:text-4xl">{capLetters(mark.title)}</h1>
            <div className="flex items-center gap-2">
              {isOwner && (
                <IconButton
                  onClick={() => openModal({ type: 'edit', markId: mark.id })}
                >
                  <EditIcon />
                </IconButton>
              )}
            </div>
          </div>
          <div className="mb-2 flex items-center">
            <SubHeading title="Created At" />
            <div className="text-sm">
              {format(new Date(mark.createdAt), 'dd, LLL yyyy')}
            </div>
          </div>
          <div className="mb-2 flex items-center">
            <SubHeading title="Created By" />
            <UserAvatarWithName
              size="sm"
              username={mark.author?.username}
              image={mark.author?.image}
            />
          </div>

          <div className="flex items-center">
            <SubHeading title="Link" />
            <div className="flex w-3/4 items-center gap-2">
              <ButtonLink size="sm" href={mark.url}>
                {mark.url}
              </ButtonLink>
              <BsLink className="h-6 w-6" />
            </div>
          </div>

          <div className="flex items-center">
            <SubHeading title="Type" />
            <div>{capLetter(mark.type)}</div>
          </div>

          <div className="flex items-center">
            <SubHeading title="Tags" />
            <div className="flex gap-2">
              {mark.tags.map((tag) => (
                <Badge name={tag.name} key={tag.name} size="lg" />
              ))}
            </div>
          </div>
          <p className="py-6 lg:text-xl">{mark.description}</p>

          <div>
            <h3 className="pb-4 lg:text-xl">
              Comments ({mark.comments.length})
            </h3>
            {mark.comments && <Comment comments={mark.comments} id={mark.id} />}
          </div>
        </div>
      )}
    </BasicLayout>
  )
}

export default DetailPage

export const getStaticPaths = async () => {
  const data = await prisma.mark.findMany({
    select: { id: true },
  })
  const paths = data.map((p) => ({ params: { id: p.id } }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['mark', id], () => getMark(id))
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id,
    },
  }
}
