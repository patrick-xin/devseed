import DashboardLayout from '@/components/layout/DashboardLayout'
import PersonalBookmark from '@/components/mark/Personalmark'
import { GridContainer } from '@/components'
import {
  useUserCollections,
  useUserFolderCollections,
  useUserFolders,
} from '@/lib/hooks'

import { useRouter } from 'next/router'
import { useMemo } from 'react'

const DashboardCollection = () => {
  const { query } = useRouter()
  const { userFolders } = useUserFolders()
  const { userCollections } = useUserCollections()

  const { FolderCollections } = useUserFolderCollections(
    query?.id?.[0] as string
  )

  const title = useMemo(() => {
    return (
      userFolders?.find((folder) => folder.id === query?.id?.[0])?.name || 'All'
    )
  }, [userFolders, query])

  return (
    <DashboardLayout>
      {query.id ? (
        <>
          <h1 className="pb-4 lg:pb-12 lg:text-3xl">
            {title}
            <span className="mx-2 text-white/20">
              ({FolderCollections?.length})
            </span>
          </h1>
          <GridContainer>
            {FolderCollections?.map((c) => (
              <PersonalBookmark
                key={c.mark[0].id}
                title={c.mark[0].title}
                link={c.mark[0].url}
                note={c.mark[0].description}
                id={c.mark[0].id}
                collectionId={c.id}
                folders={userFolders}
              />
            ))}
          </GridContainer>
        </>
      ) : (
        <>
          <h1 className="pb-4 lg:pb-12 lg:text-3xl">
            {title} Marks I&apos;ve collected
            <span className="mx-2 text-white/20">
              ({userCollections?.length})
            </span>
          </h1>
          <GridContainer>
            {userCollections?.length === 0
              ? "havn't collected"
              : userCollections?.map((c) => (
                  <PersonalBookmark
                    key={c.mark[0].id}
                    title={c.mark[0].title}
                    link={c.mark[0].url}
                    note={c.mark[0].description}
                    id={c.mark[0].id}
                    collectionId={c.id}
                    folders={userFolders}
                    folderName={c.folder?.name}
                  />
                ))}
          </GridContainer>
        </>
      )}
    </DashboardLayout>
  )
}

export default DashboardCollection
