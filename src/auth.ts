import GoogleProvider from 'next-auth/providers/google';
import NextAuth, { Session } from "next-auth"
import { addUser } from './service/sanity';
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider ({
      clientId: process.env.AUTH_GOOGLE_ID, clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async signIn({ user: { id, name, image, email }}) {
      // console.log('user_auth_signIn: ', user)
      if (!email || !id) {
        return false
      }  
      addUser({
        id,
        name,
        username: email?.split('@')[0],
        email,
        userId: id,
        image,
        createdAt: new Date().toISOString().split(/T/)[0]
      })
      return true;
    },
    async session({ session }: { session: Session }) {
      // console.log('session_auth: ',session)
      const user = session?.user
      if(user) {
        session.user = {
          ...user,
          username: user.email?.split('@')[0] || '',
          userId: user.id || ''
        }
      }
      return session;
    },
  },
})
