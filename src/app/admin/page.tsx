import { SessionProvider } from "next-auth/react"
import Dashboard from "./dashboard";
 
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