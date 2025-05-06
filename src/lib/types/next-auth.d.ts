/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  // Types of user
  interface User {
    user: {
      firstName: string;
      lastName: string;
      email: string;
      gender: "male" | "female";
      phone: string;
      photo: string | null;
      role: "user" | "admin";
      addresses: [];
      wishlist: [];
    } & DataBaseFields;
    token: string;
  }

  // Session Omit User
  interface Session extends Omit<User,"token"> {
   
  }
}

declare module "next-auth/jwt" {

  interface JWT extends User {}
}