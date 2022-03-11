import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios'

import { getSession, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";

export default function Home({session, newsApi}) {

  console.log(newsApi)

  return (
    <div>
      Hello World
    </div>
  )
}


export async function getServerSideProps (context) {
  const session = await getSession({ req: context.req });

  // const newsApi = axios.get('https://newsapi.org/v2/everything?q=tesla&from=2022-02-10&sortBy=publishedAt&apiKey=71570a86e3e944db95e7b2616915be4b')
  // .then((response)=>{
  //   console.log(response)
  // })

  return {
    props: {
      session: await getSession(context),
    },
  };
//   if (!session) {
//     return {
//         redirect: {
//             destination: 'api/auth/signin',
//             permanent: false,
//         },
//     };
// }
// return {
//     props: { session },
// };
}