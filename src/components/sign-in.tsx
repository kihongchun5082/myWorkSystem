"use client";
import { getProviders, signIn } from "next-auth/react";
import ColoredButton from "./ui/ColoredButton";
import { useEffect, useState } from "react";

// const providers = await getProviders() ?? {};
// console.log('providers1_sign-in: ',providers)
type AuthProvider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
};

type Props = {
  callbackUrl: string;
};
export default function SignIn({ callbackUrl }: Props) {
  const [providers, setProviders] = useState<Record<
    string,
    AuthProvider
  > | null>(null);

  useEffect(() => {
    async function fetchProvider() {
      const res = await getProviders();
      setProviders(res);
      console.log("providers2_sign-in: ", res);
    }
    fetchProvider();
  }, []);

  if (!providers) return <p>Loading ...</p>;

  return (
    <>
      {Object.values(providers).map((provider) => (
        <ColoredButton
          key={provider.id}
          text={`Sign In with ${provider.name}`}
          onClick={() => signIn(provider.id, { callbackUrl })}
          size="big"
        />
      ))}
    </>
  );
}

// <button className=" border-4 border-b-blue-500" onClick={() => signIn("google", { redirectTo: "/" })}>
//  매뉴얼과 똑같이 로그인
// </button>
