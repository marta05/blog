import db from '../../lib/db'
import { useState, useEffect } from 'react'

import { getSession, signIn, signOut, useSession } from 'next-auth/react'
import {
  Box,
  Toolbar,
  Typography,
  Button,
  ThemeProvider,
  Paper,
} from '@mui/material'
import { createTheme, responsiveFontSizes } from '@mui/material/styles'

import Post from '../../components/Card/Post'
import Router from 'next/router'


export default function Posts({ session, postUser, sessionUser }) {
  const [visible, setVisible] = useState(3)

  console.log('posts and user name', postUser)
  console.log('sessionUser', sessionUser)
  console.log('session', session)

  const dateFormatted = (date) => {
    const dateObj = new Date(date)
    const month = dateObj.getUTCMonth() + 1
    const day = dateObj.getUTCDate()
    const year = dateObj.getUTCFullYear()
    return `${month}/${day}/${year}`
  }

  const handleClick = async () => {
    Router.push('/posts/edit')
  }
  
  let theme = createTheme()
  theme = responsiveFontSizes(theme)

  return (
    <div>
      {!session && (
        <ThemeProvider theme={theme}>
          <Toolbar
            sx={{
              width: '60%',
              height: '70vh',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              style={{
                // margin: '16px 0px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
              }}
              variant="outlined"
            >
              <Typography
                variant="h2"
                component="h3"
                sx={{ textAlign: 'center', margin: '4% 0' }}
              >
                Sign in to see the posts of other users.
              </Typography>
              <Typography
                variant="h5"
                component="h3"
                sx={{ textAlign: 'center', marginBottom: '4%' }}
              >
                Make sure to toggle Admin features to share your posts with the
                community of bloggers!
              </Typography>
            </Box>
            <Button
              size="large"
              variant="contained"
              onClick={() => signIn({ redirect: '/api/auth/signin' })}
            >
              Sign in
            </Button>
          </Toolbar>
        </ThemeProvider>
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
                <Button variant="contained" color="success"
                  onClick={() => handleClick()}
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
  console.log('session', session)

  const postUser = await db
    .query(
      `SELECT "post".id as post_id, "post".date_created, "post".title, "post".views, "post".content, "user".name, "user".admin FROM "post" INNER JOIN "user" ON "post".user_id = "user".id`,
    )
    .then((results) => results.rows)

  if (session) {
    const sessionUser = await db
      .query(
        `SELECT id, email, admin, name  FROM "user" WHERE id = ${session.user.id}`,
      )
      .then((results) => results.rows[0])

    return {
      props: {
        session,
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
