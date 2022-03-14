// import { getSession } from 'next-auth/client'
import db from '../../../lib/db'
const {
  hashPassword,
  verifyPassword,
  validateInput,
} = require('../../../helpers/users')

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // get user credentials from the request body
    const { name, email, admin, password, confirmPassword } = req.body

    // validate the registration input
    const error = validateInput(name, email, password, confirmPassword)
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      })
    }
    // hash the password
    const hashedPassword = await hashPassword(password)

    const verifyEmail = await db.query(
        `SELECT * FROM "user" WHERE email = '${email}'`
        ).then((results) => results.rows[0])

    //verify if email is already taken
    if (verifyEmail) {
        return res.status(400).json({
            error: 'Email already exists',
        })
    } else {
        // insert the user into the database
        const user = await db
        .query(
          `
              INSERT INTO "user" (name, email, hashed_password, admin) VALUES ($1, $2, $3, $4) RETURNING name, email, admin`,
          [name, email, hashedPassword, admin],
        )
        .then((results) => results.rows[0])
        
        console.log("created user", user)
        // return the user
        return await res.status(201).json({
            user,
        })
    }

  }
}
