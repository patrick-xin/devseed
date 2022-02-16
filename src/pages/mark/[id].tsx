import { BsLink } from 'react-icons/bs'

import { ButtonLink, IconButton } from '@/components/buttons'
import { UserAvatarWithName, Badge, SubHeading } from '@/components/mark'
import BasicLayout from '@/components/layout/BasicLayout'
import prisma from '@/lib/prisma'

import type { GetStaticProps } from 'next'

import { capLetter, capLetters } from 'uitls'
import { format } from 'date-fns'
import { useGetMark, useUser } from '@/lib/hooks'
import { EditIcon } from '@/components/icons'
import { useMarkFormModalStore } from '@/lib/store/modal'
import { dehydrate, QueryClient } from 'react-query'
import { getMark } from '@/services/api'

const DetailPage = ({ id }: { id: string }) => {
  const { user } = useUser()
  const { openModal } = useMarkFormModalStore()
  const { mark, isLoadingMark } = useGetMark(id)

  const isOwner = user?.id === mark?.authorId
  if (isLoadingMark) return <div>loading</div>
  return (
    <BasicLayout>
      {mark && (
        <div className="max-w-2xl space-y-4 p-4">
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

              <UserAvatarWithName
                size="md"
                username={mark.author?.name}
                image={mark.author?.image}
              />
            </div>
          </div>
          <div className="mb-2 flex items-center text-xs">
            <SubHeading title="Created At" />
            <div>{format(new Date(mark.createdAt), 'dd, LLL yyyy')}</div>
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
            <h3 className="pb-4 lg:text-xl">Comments (10)</h3>
            <div className="space-y-4">
              <div className="rounded-md border border-white/10 p-4">
                <div className="flex justify-between">
                  <UserAvatarWithName
                    size="sm"
                    username={mark.author?.name}
                    image={mark.author?.image}
                  />
                  <div className="text-sm text-white/20">
                    created at 2022-02-12
                  </div>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic,
                  officia sint. Inventore sequi a eius possimus exercitationem
                  eaque voluptates dignissimos architecto ipsum tempore debitis,
                  ipsa facere. Cumque repudiandae dolore cum.
                </p>
              </div>
              <div className="rounded-md border border-white/10 p-4">
                <div className="flex justify-between">
                  <UserAvatarWithName
                    size="sm"
                    username={mark.author.name}
                    image={mark.author.image}
                  />
                  <div className="text-sm text-white/20">
                    created at 2022-02-12
                  </div>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic,
                  officia sint. Inventore sequi a eius possimus exercitationem
                  eaque voluptates dignissimos architecto ipsum tempore debitis,
                  ipsa facere. Cumque repudiandae dolore cum.
                </p>
              </div>
            </div>
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
