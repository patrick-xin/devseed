import { DashboardLayout } from '@/dashboard/components'
import { UserMark } from '@/user/components'
import { GridContainer } from '@/components'
import {
  useUserCollections,
  useUserFolderCollections,
  useUserFolders,
} from '@/user/hooks'

import { useRouter } from 'next/router'
import { useMemo } from 'react'

const DashboardCollection = () => {
  const { query } = useRouter()
  const { userFolders } = useUserFolders()

  const { userCollections } = useUserCollections()
  const { folderCollections } = useUserFolderCollections(
    query?.id?.[0] as string
  )
  console.log(folderCollections)

  const title = useMemo(() => {
    return (
      userFolders?.find((folder) => folder.id === query?.id?.[0])?.name || 'All'
    )
  }, [userFolders, query])

  return (
    <DashboardLayout>
      {query.id ? (
        <div className="mx-auto w-full max-w-6xl">
          <h1 className="pb-4 lg:pb-12 lg:text-3xl">
            {title}
            <span className="mx-2 text-white/20">
              ({folderCollections?.length})
            </span>
          </h1>
          <GridContainer>
            {folderCollections?.map((c, index) => (
              <UserMark
                key={c.collectionMark[0].id}
                title={
                  c.collectionMark[0].name ?? c.collectionMark[0].mark.title
                }
                link={c.collectionMark[0].mark.url}
                description={
                  c.collectionMark[0].note ??
                  c.collectionMark[0].mark.description
                }
                id={c.collectionMark[0].id}
                collectionId={c.id}
                folders={userFolders}
                index={index + 1}
                folderName={title}
              />
            ))}
          </GridContainer>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-6xl">
          <h1 className="pb-4 lg:pb-12 lg:text-3xl">
            {title} Marks I&apos;ve collected
            <span className="mx-2 text-white/20">
              ({userCollections?.length})
            </span>
          </h1>
          <GridContainer>
            {userCollections?.length === 0
              ? "havn't collected"
              : userCollections?.map((c, index) => (
                  <UserMark
                    index={index + 1}
                    key={c.collectionMark[0].id}
                    title={c.collectionMark[0].mark.title}
                    link={c.collectionMark[0].mark.url}
                    description={c.collectionMark[0].mark.description}
                    id={c.collectionMark[0].id}
                    collectionId={c.id}
                    folders={userFolders}
                    folderName={c.folder?.name}
                  />
                ))}
          </GridContainer>
        </div>
      )}
    </DashboardLayout>
  )
}

export default DashboardCollection
