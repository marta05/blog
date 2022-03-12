import Image from 'next/image'
import styles from '../styles/Home.module.css'
// import db from '../lib/db'

import { getSession, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import Review from '../components/Card/Review'
import { Toolbar, Typography, ThemeProvider} from '@mui/material';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';


export default function Home() {

let theme = createTheme();
theme = responsiveFontSizes(theme);

  return (
    <div>
      <Toolbar sx={{ display: `flex`, flexDirection:'column', alignContent:'center', justifyContent:'center'}}>
        <ThemeProvider theme={theme}>
          <Typography variant="h3" color="info.dark" sx={{ fontWeight: 700, marginTop:'3%', textAlign:'center' }}>Welcome to BlogoMania!</Typography>
        </ThemeProvider>
      </Toolbar>
      <Toolbar sx={{ display: `flex`, width: '100%', justifyContent: "space-around", flexWrap:'wrap'}}>
        <Review
        initials={"MG"}
        title={"Marta"}
        text= {"One of the greates blogging apps I have found so far, can't stress enough how much I enjoy it's simplicity and design! The customer service is extremaly fast with responses and the extra feature to have an admin panel covers it all!"}
        value={5}
        />
        <Review
        initials={"AC"}
        title={"Andrea"}
        text= {"I was recommended to use this platform by a friend, after using it for almost a year I must say it covers all the functionality I look for in the blogging website. The only minus I would point out is lack of having it in App format to blog on the go"}
        value={4}
        />
        <Review
        initials={"CE"}
        title={"Carol"}
        text= {"Game changer! Easy to navigate and you don't get lost with the amount of features that most of the platforms try to cover these day. It's nice that it specialises in one thing - blog posts, and it's all that I've been looking for!"}
        value={4.5}
        />
    </Toolbar>
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