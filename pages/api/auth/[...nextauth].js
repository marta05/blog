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
        // add the database logic here
        const dbEmail = credentials.email
        console.log(dbEmail)
        
        // const dbUser = await db.query(`SELECT * FROM "user" WHERE email = ${dbEmail}`).then((results)=> results.rows[0])
        const dbUser = await db.query(`SELECT * FROM "user" WHERE email = '${dbEmail}'`).then((results)=> results.rows[0])
        console.log(dbUser)

          if(dbUser.length === 0){
           console.log("The user with the email doesn't exist")
        } else if(
          credentials.password === dbUser.hashed_password
         ) {
          return {
            id: dbUser.id,
            // name: "name",
            email: dbUser.email,
            admin: dbUser.admin
          }
        } else {
          return null
        }
          
        // if (
          
        //   credentials.email === "john" &&
        //   credentials.password === "test"
        // ) {
        //   return {
        //     id: 1,
        //     name: "John",
        //     email: "johndoe@test.com",
        //     isAdmin: "true",
        //   };
        // } else if (
        //     credentials.email === "marta" &&
        //     credentials.password === "test"
        // ) {
        //     return {
        //         id: 2,
        //         name: "Marta",
        //         email: "marta@test.com",
        //         isAdmin: "false",
        //     }
        // }
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