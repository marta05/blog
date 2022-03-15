import db from '../../lib/db'
import { useState, useEffect } from 'react';

import { getSession, signIn, signOut, useSession} from "next-auth/react";
import { Box, Toolbar, Typography, Button, ThemeProvider } from '@mui/material';
import { createTheme, responsiveFontSizes } from '@mui/material/styles'

import Post from '../../components/Card/Post'


export default function Posts({session, postUser, sessionUser}) {
  console.log("posts and user name", postUser)
  console.log("sessionUser", sessionUser)

  const [dateCreated, setDateCreated] = useState('')

  const dateFormatted = (date) => {
    const dateObj = new Date(date)
    const month = dateObj.getUTCMonth() + 1
    const day = dateObj.getUTCDate()
    const year = dateObj.getUTCFullYear()
    return `${month}/${day}/${year}`
  }
  
  // const [session, loading] = useSession();
  // const [posts, setPosts] = useState([]);
  // const [sessionUser, setSessionUser] = useState(null);
  console.log("session", session)

  let theme = createTheme()
  theme = responsiveFontSizes(theme)
  
  return (
    <div>
      {!session && (
         <ThemeProvider theme={theme}>
        <Toolbar sx={{width: '60%', height: '70vh', margin:'0 auto', display:'flex', flexDirection:'column', alignContent:'center', justifyContent:'center'}}>
        <Box style={{ margin: "16px 0px", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center'}} variant="outlined">
          <Typography variant="h2" component="h3" sx={{textAlign: 'center', margin: '4% 0'}}>
            Sign in to see the posts of other users.
          </Typography>
          <Typography variant="h5" component="h3" sx={{textAlign: 'center', marginBottom: '4%'}}>
           Make sure to toggle Admin features to share your posts with the community of bloggers!
          </Typography>
        </Box>
          <Button
          size='large'
          variant="contained"
          onClick={() =>
            signIn({ redirect: "/api/auth/signin" })}
          >
            Sign in
            </Button>
        </Toolbar>
        </ThemeProvider>
      )}
      {session && (
        <ThemeProvider theme={theme}>
        <Box style={{ margin: "16px 0px", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center'}} variant="outlined">
          <Typography variant="h2" component="h3" sx={{textAlign: 'center', margin: '2% 0'}}>
            Welcome {sessionUser.name}!
          </Typography>
        </Box>
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between' ,flexWrap:'wrap', width:'100%' }}>
          {sessionUser.admin && (
            postUser.map(post => (
              <Post
                key={post.id}
                dateCreated={dateFormatted(post.date_created)}
                title={post.title}
                views={post.views}
                userName={post.name}
                date={post.date}
              />
            ))
          )}
        </Toolbar> 
  </ThemeProvider>
      )}
    </div>
  )
}


export async function getServerSideProps (context) {
  const session = await getSession(context);
  console.log("session",session)
  console.log("context", context)

  // const posts = await db.query('SELECT * FROM post').then((results)=> results.rows)
  
  //create a new table called user_post

  const postUser = await db.query(`SELECT "post".id, "post".date_created, "post".title, "post".views, "post".content, "user".name, "user".admin FROM "post" INNER JOIN "user" ON "post".user_id = "user".id`).then((results)=> results.rows)
  console.log("postUser", postUser)
  
  if(session){
    const sessionUser = await db.query(`SELECT id, email, admin, name  FROM "user" WHERE id = ${session.user.id}`).then((results)=> results.rows[0])

    return {
      props: {
        session,
        postUser,
        sessionUser
      }
    }
  } else {
    return {
      props: {
        session: null,
      }
    }
  }
}