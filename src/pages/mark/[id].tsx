import { Badge, UserAvatar } from '@/components'
import prisma from '@/lib/prisma'
import { Mark } from '@/lib/types'
import { GetStaticProps } from 'next'
import React from 'react'
import superjson from 'superjson'
import { capLetter, capLetters } from 'uitls'

type DetailPageProps = {
  data: { json: Mark }
}

const DetailPage = ({ data }: DetailPageProps) => {
  const mark = data.json

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="lg:text-3xl">{capLetters(mark.title)}</h1>
      <h3>{mark.author.name}</h3>
      <UserAvatar username={mark.author.name} image={mark.author.image} />
      <a>{mark.url}</a>
      <div>{capLetter(mark.type)}</div>
      <div>
        {mark.tags.map((tag) => (
          <Badge name={tag.name} key={tag.name} />
        ))}
      </div>
      <p>{mark.description}</p>
    </div>
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
