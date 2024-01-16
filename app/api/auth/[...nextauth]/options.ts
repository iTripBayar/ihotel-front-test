import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FaceBookProvider from "next-auth/providers/facebook";
// import { serialize, CookieSerializeOptions } from 'cookie';
import { cookies } from "next/headers";

const characters = "abcdefghijklmnopqrstuvwxyz";
let randomString = "";
for (let i = 0; i < 8; i++) {
  const randomIndex = Math.floor(Math.random() * characters.length);
  randomString += characters.charAt(randomIndex);
}
const randomInteger = Math.floor(Math.random() * (100000 - 10001 + 1)) + 10001;

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FaceBookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "email",
          placeholder: "your-username",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your-password",
        },
      },
      async authorize(credentials) {
        const response = await fetch(`${process.env.WEB_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        let user = await response.json();
        if (response.ok && user.accessToken) {
          const token = user.accessToken;
          cookies().set("accessToken", token);
          user = {
            id: user.accessToken,
            name: credentials?.email.split("@")[0],
            email: credentials?.email,
          };
          return user;
        } else {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, user }) {
      if (account && account.provider === "google") {
        // checking
        try {
          const registerResponse = await fetch(
            `${process.env.WEB_URL}/api/register`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                email: user.email,
                password: `${randomString}A!${randomInteger}`,
                passwordConfirmation: `${randomString}A!${randomInteger}`,
              }),
            },
          );
          const res = await registerResponse.json();
          // console.log(res);
        } catch (error: any) {
          // if (error.response) {
          //   console.error("HTTP error! Status:", error.response.status);
          //   console.error("Response data:", error.response.data);
          // } else {
          //   console.error("Request error:", error.message);
          // }
        }
        //
      }
      return true;
    },
  },
};
