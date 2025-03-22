import { SessionProvider } from "next-auth/react"
 
type Props = {
 children: React.ReactNode;
}
export default function Administrator({ children }: Props) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}