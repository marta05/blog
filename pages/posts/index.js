import db from '../../lib/db'

import { getSession, signOut, useSession } from "next-auth/react";

export default function Posts({session, posts}) {
  console.log(session)

  console.log(posts)

  return (
    <div>
      {posts.map((i, index)=>
        <h4 key={index}>{i.title}</h4>
      )}
    </div>
  )
}


export async function getServerSideProps (context) {

  const session = await getSession({ req: context.req });

  // const isAdmin = await db.query('SELECT admin FROM user WHERE id = ?', session.id)
  const posts = await db.query('SELECT * FROM post').then((results)=> results.rows)

  return {
    props: {
      session: await getSession(context),
      posts
    },
  };
}