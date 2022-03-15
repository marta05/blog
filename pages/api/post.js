
import db from '../../lib/db'

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
      const { postId } = req.body
      try {
        const response = await db
          .query(
            `DELETE FROM "post" WHERE id = $1`, [postId],
          )
          .then((results) => {
            return results.rows[0]
          })
        res.status(200).json(response)
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Server error' })
      }


      //   const { postId } = req.body
      // console.log("this is postId", postId)


      // try{
      //   const response = db.query(`DELETE FROM "post" WHERE id = $1`, [postId])
      //   res.status(204).json({status: 'post successfully deleted'})
      // } catch(err) {
      //   console.log(err)
      // }
    } 
    

    
  }