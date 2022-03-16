import db from '../../lib/db'
import Register from '../../components/Registration/Registration'
import Post from '../../components/Card/Post'
import axios from 'axios'
import router from 'next/router'
import { useState } from 'react'
import { getSession, signIn, useSession } from 'next-auth/react'
import {Toolbar,Typography,Button,ThemeProvider,Paper} from '@mui/material'
import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import Unauthorized from '../../components/Unauthorized/Unauthorized'

export default function Posts({ postUser, sessionUser }) {
  const { data: session } = useSession()

  const [visible, setVisible] = useState(3)

  //convert the date object to a readable format
  const dateFormatted = (date) => {
    const dateObj = new Date(date)
    const month = dateObj.getUTCMonth() + 1
    const day = dateObj.getUTCDate()
    const year = dateObj.getUTCFullYear()
    return `${month}/${day}/${year}`
  }

  //insert new post to the database with id, userId and dateCreated
  const handleSubmit = () => {
    axios
      .post('/api/post', {
        title: '',
        content: '',
        userId: session.user.id,
        dateCreated: new Date(),
      })
      .then(function (response) {
        router.push(`/posts/edit/${response.data.id}`)
      })
  }

  //activate responsive font sizes
  let theme = createTheme()
  theme = responsiveFontSizes(theme)

  return (
    <div>
      {!session && (
        <Unauthorized/>
      )}
      {session && (
        <ThemeProvider theme={theme}>
          <Toolbar
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Paper
              elevation={4}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '15px',
                margin: '1% 0',
                width: '100%',
                boxSizing: 'content-box',
              }}
            >
              <Typography
                variant="h2"
                component="h3"
                sx={{ textAlign: 'center', margin: '2% 0' }}
              >
                Welcome {sessionUser.name}!
              </Typography>
              <Typography
                variant="body"
                component="h3"
                sx={{
                  textAlign: 'center',
                  marginBottom: '2%',
                  fontWeight: '500',
                }}
              >
                {sessionUser.admin
                  ? 'As an admin user you can view posts of all other users, as well as add, edit and delete your own posts'
                  : 'As a standard user your have the permission to view the posts of all other users'}
              </Typography>
              {sessionUser.admin ? (
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleSubmit()}
                >
                  + Add New Post
                </Button>
              ) : null}
            </Paper>
            <Paper
              elevation={4}
              sx={{
                padding: '20px',
                margin: '2% 0',
                width: '100%',
                boxSizing: 'content-box',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Toolbar
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  flexWrap: 'wrap',
                  width: '100%',
                }}
              >
                {postUser.slice(0, visible).map((post) => (
                  <Post
                    key={post.post_id}
                    postId={post.post_id}
                    dateCreated={dateFormatted(post.date_created)}
                    title={post.title}
                    views={post.views}
                    userName={post.name}
                    date={post.date}
                  />
                ))}
              </Toolbar>
              {postUser.length > visible && (
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => setVisible(visible + 3)}
                >
                  Show more
                </Button>
              )}
            </Paper>
          </Toolbar>
        </ThemeProvider>
      )}
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  //get all posts from the database with the user information
  const postUser = await db
    .query(
      `SELECT "post".id as post_id, "post".date_created, "post".title, "post".views, "post".content, "user".name, "user".admin FROM "post" INNER JOIN "user" ON "post".user_id = "user".id`,
    )
    .then((results) => results.rows)

    //get information of a logged in user
  if (session) {
    const sessionUser = await db
      .query(
        `SELECT id, email, admin, name  FROM "user" WHERE id = ${session.user.id}`,
      )
      .then((results) => results.rows[0])

    return {
      props: {
        // session,
        postUser,
        sessionUser,
      },
    }
  } else {
    return {
      props: {
        session: null,
      },
    }
  }
}
