import { redirect } from "next/navigation"
import { auth } from "@/auth"
import SignIn from "@/components/sign-in"
// import { getProviders } from "next-auth/react"

export default async function SignInPage(/* props: { searchParams: Promise<{ callbackUrl?: string }> } */) {
  
  const session = await auth()
  // const { callbackUrl } = await props.searchParams

  // console.log('session_SignInPage: ',session?.user?.name)
  
  if (session) {
    redirect(/* callbackUrl ?? */ "/")
  }

  // const providers = (await getProviders()) ?? {};  

  return (
    <section className=" justify-center mt-40">
      <SignIn /* callbackUrl={ callbackUrl ?? "/" } */ />
    </section>
  )
}