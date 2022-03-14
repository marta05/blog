import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import axios from 'axios'
import db from '../../../lib/db'


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
      authorize: async (credentials) => {
        const dbEmail = credentials.email

        // the database lookup for the user
        const dbUser = await db.query(`SELECT * FROM "user" WHERE email = '${dbEmail}'`).then((results)=> results.rows[0])

        //verifying if the user exists and if the password input matches password from the db
          if(dbUser.length === 0){
           console.log("The user with the email doesn't exist")
        } else if(
          credentials.password === dbUser.hashed_password
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
  ],
  session: {
    jwt: true,
  },
  jwt: {
    secret: "test",
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
  // pages: {
  //   signIn: "http://localhost:3000/signin",
  // },
});