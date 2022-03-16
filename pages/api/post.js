import db from '../../lib/db'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
  //POST METHOD
  if (req.method === 'POST') {
    const { title, content, userId, dateCreated } = req.body

    const session = await getSession({ req })
    console.log('my console .log session', session)

    try {
      const response = await db
        .query(
          `INSERT INTO "post" (title, content, user_id, date_created) VALUES ($1, $2, $3, $4) RETURNING id, title, content, user_id, date_created`,
          [title, content, userId, dateCreated],
        )
        .then((results) => {
          if (session.user.id === userId) {
            return results.rows[0]
          } else {
            res.status(401).json({
              status: 'error',
              message: 'You are not authorized to create a post',
            })
          }
        })
      console.log(response)

      res.status(201).json(response)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Server error' })
    }
  }

  //PUT METHOD
  if (req.method === 'PUT') {
    const { title, content, postId } = req.body

    try {
      const response = await db
        .query(
          `UPDATE "post" SET title = $1, content = $2 WHERE id = $3 RETURNING id, title, content, user_id, date_created`,
          [title, content, postId],
        )
        .then((results) => results.rows[0])
      console.log(response)
      res.status(200).json(response)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Server error' })
    }
  }

  //DELETE METHOD
  if (req.method === 'DELETE') {
    const { postId } = req.body
    try {
      const response = await db
        .query(`DELETE FROM "post" WHERE id = $1`, [postId])
        .then((results) => {
          return results.rows[0]
        })
      res.status(200).json(response)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Server error' })
    }
  }
}
