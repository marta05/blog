import Image from 'next/image'
import styles from '../styles/Home.module.css'
import db from '../lib/db'

import { getSession, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";

export default function Home({session, posts}) {

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

  const posts = await db.query('SELECT * FROM post').then((results)=> results.rows)

  return {
    props: {
      session: await getSession(context),
      posts
    },
  };
}