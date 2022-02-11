import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'

import { useUser } from '@/lib/hooks'

const WelcomePage = () => {
  const router = useRouter()
  const { user, session, status } = useUser()
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')

  const { mutate, isLoading } = useMutation(
    () => {
      return fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, bio }),
      })
    },
    {
      onSuccess: () => {
        router.push(`/dashboard`)
      },
    }
  )

  useEffect(() => {
    if (status === 'unauthenticated') router.push(`/login`)
  }, [profile, status, router])
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center justify-center">
      <h1>Welcome {session?.user?.name}</h1>
      <form
        className="flex w-full flex-col space-y-4"
        onSubmit={async (e) => {
          e.preventDefault()
          mutate()
        }}
      >
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
          className="form-input"
        />
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="tell something about yourself"
          className="form-input"
        />
        <Button disabled={isLoading} type="submit" title="submit"></Button>
      </form>
    </div>
  )
}

export default WelcomePage
