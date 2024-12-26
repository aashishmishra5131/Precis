export type User = {
  id: string;
  name?: string;
  email: string;
  emailVerified?: boolean | null;
  image: string;
};