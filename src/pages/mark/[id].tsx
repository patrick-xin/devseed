import superjson from 'superjson'
import { BsLink } from 'react-icons/bs'

import { ButtonLink } from '@/components/buttons'
import { UserAvatarWithName, Badge, SubHeading } from '@/components/mark'
import BasicLayout from '@/components/layout/BasicLayout'
import prisma from '@/lib/prisma'

import type { Mark } from '@/lib/types'
import type { GetStaticProps } from 'next'

import { capLetter, capLetters } from 'uitls'
import { format } from 'date-fns'

type DetailPageProps = {
  data: { json: Mark }
}

const DetailPage = ({ data }: DetailPageProps) => {
  const mark = data.json
  const { author, type, tags, title, description, createdAt } = mark
  return (
    <BasicLayout>
      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <h1 className="pb-4 lg:text-4xl">{capLetters(title)}</h1>

          <UserAvatarWithName
            size="lg"
            username={author.name}
            image={author.image}
          />
        </div>
        <div className="mb-2 flex items-center text-xs">
          <SubHeading title="Created At" />
          <div>{format(new Date(createdAt), 'dd, LLL yyyy')}</div>
        </div>
        <div className="flex items-center">
          <SubHeading title="Link" />
          <div className="flex items-center gap-2">
            <ButtonLink size="lg" href={mark.url}>
              {mark.url}
            </ButtonLink>
            <BsLink className="h-6 w-6" />
          </div>
        </div>

        <div className="flex items-center">
          <SubHeading title="Type" />
          <div>{capLetter(type)}</div>
        </div>

        <div className="flex items-center">
          <SubHeading title="Tags" />
          {tags.map((tag) => (
            <Badge name={tag.name} key={tag.name} size="lg" />
          ))}
        </div>
        <p className="py-6 lg:text-xl">{description}</p>

        <div>
          <h3 className="pb-4 lg:text-xl">Comments (10)</h3>
          <div className="space-y-4">
            <div className="rounded-md border border-white/10 p-4">
              <div className="flex justify-between">
                <UserAvatarWithName
                  size="sm"
                  username={author.name}
                  image={author.image}
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
                  username={author.name}
                  image={author.image}
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
  const id = params!.id as string
  const mark = await prisma.mark.findUnique({
    where: { id },
    include: { author: true, comments: true, likes: true, tags: true },
  })
  return {
    props: {
      data: superjson.serialize(mark),
    },
  }
}
