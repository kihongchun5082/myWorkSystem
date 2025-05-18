export type User = {
 name?: string | null;
 username: string;
 userId: string;
 email: string;
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