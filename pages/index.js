import Image from 'next/image'
import styles from '../styles/Home.module.css'
// import db from '../lib/db'

import { getSession, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import Review from '../components/Card/Review'
import { Container } from '@mui/material';

export default function Home() {


  return (
    <div>
      <Container sx={{ display: `flex`, width: '100%', justifyContent: "space-around", flexWrap:'wrap'}}>
        <Review
        initials={"MG"}
        title={"Marta"}
        text= {"helooo"}
        value={5}
        />
        <Review
        initials={"AC"}
        title={"Andrea"}
        text= {"helooo"}
        value={4}
        />
        <Review
        initials={"CE"}
        title={"Claudia"}
        text= {"helooo"}
        value={4.5}
        />
    </Container>
    </div>
  )
}


// export async function getServerSideProps (context) {

//   const session = await getSession({ req: context.req });

//   const posts = await db.query('SELECT * FROM post').then((results)=> results.rows)

//   return {
//     props: {
//       session: await getSession(context),
//       posts
//     },
//   };
// }