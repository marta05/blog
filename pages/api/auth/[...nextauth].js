import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import axios from 'axios'

export default NextAuth({
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "johndoe@test.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: (credentials) => {
        // add the database logic here

        if (
          credentials.username === "john" &&
          credentials.password === "test"
        ) {
          return {
            id: 1,
            name: "John",
            email: "johndoe@test.com",
            isAdmin: "true",
          };
        } else if (
            credentials.username === "marta" &&
            credentials.password === "test"
        ) {
            return {
                id: 2,
                name: "Marta",
                email: "marta@test.com",
                isAdmin: "false",
            }
        }

        // login failed
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user}) => {
      // first time jwt callback is run, user object is available
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }

      return session;
    },
  },
  secret: "test",
  jwt: {
    secret: "test",
    encryption: true,
  },
});