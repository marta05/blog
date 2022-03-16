import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

import db from '../../../lib/db'
const {verifyPassword} = require('../../../helpers/users')


export default NextAuth({
  providers: [
    CredentialProvider({
      name: "your credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "example@test.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        const dbEmail = credentials.email
        // const plainPassword = credentials.password

        // the database lookup for the user
        const dbUser = await db.query(`SELECT * FROM "user" WHERE email = '${dbEmail}'`).then((results)=> results.rows[0])

        //verifying if the user exists and if the password input matches password from the db
          if(dbUser === undefined) {
           console.log("The user with the email doesn't exist")
           return null
        } else if(
          //the output of verifyPassword is a boolean (true if the password matches, false if it doesn't)
          await verifyPassword(credentials.password, dbUser.hashed_password)
         ) {
          return {
            id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            admin: dbUser.admin
          }
        } else {
          return null
        }
      },
    }),
    // GitHub({
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET,
    //   }),
  ],
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    encryption: true,
  },
  callbacks: {
    jwt: ({ token, user}) => {
      // first time jwt callback is run, user object is available
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session: ({ session, token }) => {
      session.user.id = token.id;      
      return session;
    },
  },
  pages: {
    signin: '/api/auth/signin'
}
});