import { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from 'next-auth/providers/github';
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import db from "@/db/drizzle";
import { NextAuthOptions } from "next-auth"; // Import NextAuthOptions type

export const authOptions: NextAuthOptions = {  // Specify the type
  adapter: DrizzleAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    })
  ],
};

export const getAuthSession = () => getServerSession(authOptions);
