export type User = {
 name?: string | null;
 username?: string | null;
 userId?: string | null;
 email?: string | null;
 image?: string | null;
} 

export type OAuthUser = {
  id: string;
  name: string | undefined | null;
  username: string;
  userId: string;
  email: string;
  image?: string | null;
  createdAt: string;
};