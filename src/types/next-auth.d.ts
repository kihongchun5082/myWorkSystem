import { User } from "@/model/user";

declare module 'next-auth' {
 interface Session {
  user:{
   id: string;
   name: string | undefined | null;
   username: string;
   userId: string;
   email: string;
   image?: string | null;
   createdAt: string;
  }
  company: {
   companyName?: string | null;
   companyId?: string | null;
   image?: string | null;
  }
 }
}