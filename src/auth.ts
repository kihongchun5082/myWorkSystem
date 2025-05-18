/* 
import GoogleProvider from 'next-auth/providers/google';
import { NextAuthConfig } from "next-auth"
import { addUser } from './service/sanity';
import { Session } from 'next-auth';
 
 
export const authConfig: NextAuthConfig ={
  providers: [
    GoogleProvider ({
      clientId: process.env.AUTH_GOOGLE_ID!, clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    // async signIn({ user }: { user: User}) {
      // console.log('user_auth_signIn: ',user)
      async signIn({ user }: { user: { id: string; name?: string | null; email?: string | null; image?: string | null } }) {
        
      const { id, name, email, image } = user;
      if (!email || !id) return false
      
      await addUser({
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
          username: user.email?.split('@')[0] || ''
        }
      }
      return session;
    },
  },
} 

export { handlers, auth, signIn, signOut } from 'next-auth' */
/* 
// src/auth.ts
import Google from "next-auth/providers/google";
import { type NextAuthConfig } from "next-auth";
import { auth as NextAuthAuth } from "next-auth";
import { signIn as NextAuthSignIn } from "next-auth";
import { signOut as NextAuthSignOut } from "next-auth";

import { addUser } from "@/service/sanity";

export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email || !user.id) return false;

      await addUser({
        id: user.id,
        name: user.name,
        username: user.email.split('@')[0],
        email: user.email,
        userId: user.id,
        image: user.image,
        createdAt: new Date().toISOString().split("T")[0],
      });

      return true;
    },
    async session({ session }) {
      if (session.user) {
        session.user.username = session.user.email?.split('@')[0] || "";
      }
      return session;
    },
  },
};

// ✅ 실제 사용할 auth, signIn, signOut
export const auth = NextAuthAuth;
export const signIn = NextAuthSignIn;
export const signOut = NextAuthSignOut; */

/* import Google from "@auth/core/providers/google";
import { AuthConfig } from "@auth/core/types";
import { type NextAuthConfig } from "next-auth";
import { addUser } from "@/service/sanity";

export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email || !user.id) return false;
      await addUser({
        id: user.id,
        name: user.name,
        username: user.email.split("@")[0],
        email: user.email,
        userId: user.id,
        image: user.image,
        createdAt: new Date().toISOString().split("T")[0],
      });
      return true;
    },
    async session({ session }) {
      if (session?.user) {
        session.user.username = session.user.email?.split("@")[0] || "";
      }
      return session;
    },
  },
} satisfies AuthConfig;
 */
/*
import Signin from '@/components/Signin';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { getProviders } from 'next-auth/react';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Signin',
  description: 'Signup or Login to Instantgram',
};

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};

export default async function SignPage({
  searchParams: { callbackUrl },
}: Props) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  const providers = (await getProviders()) ?? {};

  return (
    <section className='flex justify-center mt-24'>
      <Signin providers={providers} callbackUrl={callbackUrl ?? '/'} />
    </section>
  )
}
  */

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
  // debug: true,
  callbacks: {
    async signIn({ user: { id, name, image, email }}) {
      // console.log('user_auth_signIn: ',user)
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
          username: user.email?.split('@')[0] || ''
        }
      }
      return session;
    },
  },
})
