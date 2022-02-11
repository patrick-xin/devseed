import { useState } from "react";
import { getProviders, signIn } from "next-auth/react";

import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

const LoginPage = ({ providers }: { providers: any }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  //const { login, message } = useLogin({ password, email });
  const { query } = useRouter();

  return (
    <div className="my-8 max-w-xs mx-auto">
      {/* {message && <div>{message}</div>} */}

      <>
        {Object.values<any>(providers).map((provider) => (
          <div key={provider.name}>
            <button
              onClick={() =>
                signIn(provider.id, {
                  callbackUrl: query
                    ? `http://localhost:3000/${query.username ?? ""}/${
                        query.slug ?? ""
                      }`
                    : "http://localhost:3000/dashboard",
                })
              }
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </>
    </div>
  );
};

export default LoginPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const providers = await getProviders();

  return { props: { providers } };
};
