/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomSession, CustomUser } from "@/lib/schemes/types/auth";
import NextAuth, { NextAuthOptions, User, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        user_type: { label: "User Type", type: "number" },
        fcm_token: { label: "FCM Token", type: "text" }, 
      },
      async authorize(credentials) {
        if (
          !credentials?.email ||
          !credentials?.password ||
          !credentials?.user_type
        ) {
          throw new Error(
            "يرجى إدخال البريد الإلكتروني وكلمة المرور ونوع المستخدم"
          );
        }

        try {
          const API_URL = process.env.NEXT_PUBLIC_API_URL;
          const res = await fetch(`${API_URL}api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
              user_type: credentials.user_type,
              fcm_token: credentials.fcm_token || null, 
            }),
          });

          const data = await res.json();
          if (!res.ok || !data.data) {
            throw new Error(data.message);
          }

          return {
            id: data.data.user.id.toString(),
            phone: data.data.user.mobile,
            name: data.data.user.name || null,
            email: data.data.user.email || null,
            token: data.data.token,
            fcm_token: data.fcm_token || null,
          } as CustomUser;
        } catch (error) {
          throw error instanceof Error ? error : new Error("خطأ غير معروف");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as CustomUser;
        token.id = user.id;
        token.phone = customUser.phone;
        token.name = customUser.name;
        token.email = customUser.email;
        token.token = customUser.token;
        token.fcm_token = customUser.fcm_token;
      }
      return token;
    },
    async session({ session, token }) {
      const customSession: CustomSession = {
        ...session,
        user: {
          id: token.id as string,
          phone: token.phone as string | null,
          name: token.name as string | null,
          email: token.email as string | null,
          token: token.token as string,
          fcm_token: token.fcm_token as string | null,
        },
      };
      return customSession;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
