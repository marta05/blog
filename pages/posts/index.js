import db from '../../lib/db'

import { getSession, signIn, signOut, useSession} from "next-auth/react";
import { Box, Toolbar, Typography, Button, ThemeProvider } from '@mui/material';
import { createTheme, responsiveFontSizes } from '@mui/material/styles'


export default function Posts({session, posts, sessionUser}) {
  console.log("posts", posts)
  console.log("sessionUser", sessionUser)
  
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
        <>
          Signed in as {session.user.name} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </div>
    // {<div>
    //   <h1>Posts</h1>
    //   <ul>

    //     {posts.map(post => (
    //       <li key={post.id}>
    //         <h2>{post.title}</h2>
    //         <p>{post.content}</p>
    //       </li>
    //     ))}
    //   </ul>
    // </div>}
  )
}


export async function getServerSideProps (context) {
  const session = await getSession(context);
  console.log("session",session)
  console.log("context", context)

  const posts = await db.query('SELECT * FROM post').then((results)=> results.rows)
  
  
  if(session){
    const sessionUser = await db.query(`SELECT id, email, admin, name  FROM "user" WHERE id = ${session.user.id}`).then((results)=> results.rows[0])

    return {
      props: {
        session,
        posts,
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