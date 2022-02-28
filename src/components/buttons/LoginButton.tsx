import { useRouter } from 'next/router'
import Button from './Button'

type LoginButtonProps = {
  text?: string
}

const LoginButton = ({ text = 'Login' }: LoginButtonProps) => {
  const router = useRouter()
  return (
    <Button
      onClick={() => {
        router.push({
          pathname: '/login',
          query: router.query,
        })
      }}
    >
      {text}
    </Button>
  )
}

export default LoginButton
