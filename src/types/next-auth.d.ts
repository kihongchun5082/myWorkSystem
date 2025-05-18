// import { User } from "@/model/user";
// import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// declare module 'next-auth' {
//  interface Session {
//   user:{
//    id: string;
//    name: string | undefined | null;
//    username: string;
//    userId: string;
//    email: string;
//    image?: string | null;
//    createdAt: string;
//   } & DefaultSession["user"]
//   company: {
//    companyName?: string | null;
//    companyId?: string | null;
//    image?: string | null;
//   }
//  }
// }

import { AuthUser } from '@/model/user';

declare module 'next-auth' {
  interface Session {
    user: AuthUser;
  }
}