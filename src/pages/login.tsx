import { getProviders, signIn } from 'next-auth/react'
import { Provider } from 'next-auth/providers'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'

const LoginPage = ({ providers }: { providers: Provider }) => {
  const { query } = useRouter()

  return (
    <div className="my-8 mx-auto max-w-xs">
      <>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              onClick={() =>
                signIn(provider.id, {
                  callbackUrl: query
                    ? `http://localhost:3000/${query.username ?? ''}/${
                        query.slug ?? ''
                      }`
                    : 'http://localhost:3000/dashboard',
                })
              }
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </>
    </div>
  )
}

export default LoginPage

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders()

  return { props: { providers } }
}
