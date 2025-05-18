import { redirect } from "next/navigation"
import { auth } from "@/auth"
import SignIn from "@/components/sign-in"

type Props = {
  searchParams?: {
    callbackUrl?: string;
  }
}
// export default async function SignInPage({ searchParams: { callbackUrl },}: Props) {

export default async function SignInPage({ searchParams }: Props) {
  
  const session = await auth()
  const callbackUrl = searchParams?.callbackUrl || "/"

  console.log('session_SignInPage: ',session?.user?.name)
  
  if (session) {
    redirect(callbackUrl)
  }

  return (
    <section className=" flex justify-center mt-24">
      <SignIn callbackUrl={ callbackUrl } />
    </section>
  )
}