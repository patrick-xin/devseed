import { useUser } from '@/user/hooks'
import { LoginButton } from '.'

type RequireLoginProps = {
  functionChildren: () => React.ReactNode
  text: string
}
const RequireLogin = ({ functionChildren, text }: RequireLoginProps) => {
  const { session } = useUser()
  return (
    <>{session ? <>{functionChildren()}</> : <LoginButton text={text} />}</>
  )
}

export default RequireLogin
