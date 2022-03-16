import db from '../../../lib/db'
const { hashPassword, validateInput } = require('../../../helpers/users')

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // get user credentials from the request body
    const { name, email, admin, password, confirmPassword } = req.body

    // validate the registration input
    const validationError = validateInput(name, email, password, confirmPassword)

    // hash the password
    const hashedPassword = await hashPassword(password)

    const verifyEmail = await db
      .query(`SELECT * FROM "user" WHERE email = '${email}'`)
      .then((results) => results.rows[0])

    //verify if email is already taken
    if (verifyEmail !== undefined) {
      return res.json({
        status: 'error',
        message: 'email is already taken',
      })
    } else if(validationError) {

      return res.json({
        status: 'error',
        message: validationError.message,
      })}
       else {
      // insert the user into the database
      const user = await db
        .query(
          `
              INSERT INTO "user" (name, email, hashed_password, admin) VALUES ($1, $2, $3, $4) RETURNING name, email, admin`,
          [name, email, hashedPassword, admin],
        )
        .then((results) => results.rows[0])

      // return the user
      return res.status(201).json({
        status: 'success',
        data: {
          user,
        },
      })
    }
  }
}
