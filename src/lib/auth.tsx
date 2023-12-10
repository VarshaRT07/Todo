import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  //   pages: {
  //     signIn: "/signIn",
  //   },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        name: { label: "Username", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("Received credentials:", credentials);
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }
        console.log("User after authorization:", user);

        return {
          id: user.id + "",
          email: user.email,
          name: user.name,
          firstName: "",
          lastName: "",
          profile: "",
        };
      },
    }),
    GitHubProvider({
      clientId: String(process.env.GITHUB_ID),
      clientSecret: String(process.env.GITHUB_SECRET),
    }),
    GoogleProvider({
      clientId: String(process.env.GOOGLE_ID),
      clientSecret: String(process.env.GOOGLE_SECRET),
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          name: user.name,
          profile: String(user.image),
          firstName: String((profile as any).given_name),
          lastName: String((profile as any).family_name),
        }),
      });

      return true;
    },
  },
};
