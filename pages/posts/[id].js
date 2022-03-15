import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import {Box, Typography, IconButton, Button, ThemeProvider } from '@mui/material'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { signIn } from 'next-auth/react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit';
import Router from 'next/router'

import { getSession } from 'next-auth/react'
import db from '../../lib/db'
import axios from 'axios'

export default function PostId({ session, postId, signlePostUser }) {
  const dateFormatted = (date) => {
    const dateObj = new Date(date)
    const month = dateObj.getUTCMonth() + 1
    const day = dateObj.getUTCDate()
    const year = dateObj.getUTCFullYear()
    return `${month}/${day}/${year}`
  }

  console.log(session)

  console.log(signlePostUser)
  let theme = createTheme()
  theme = responsiveFontSizes(theme)

  const handleDelete = async () => {
    const confirmation = window.confirm('Are you sure you want to delete this post?')
    if (confirmation) {
      await deletePost()
      Router.push('/posts')
    } else {
      return
    }
  }

  const deletePost = async () => {
    try{
      await axios.delete(`/api/post`, {
        data: { postId: postId }
      })
      Router.push('/posts')
    } catch(err) {
      console.log(err)
    }
  }

  // const editPost = async () => {
  //   try{
  //     await axios.put(`/api/post`, {
  //       data: { postId: postId }
  //     })
  //     Router.push('/posts/edit')
  //   } catch(err) {
  //     console.log(err)
  //   }
  // }

  const handleEdit = async () => {
    // await editPost()
    Router.push('/posts/edit/[id]', `/posts/edit/${postId}`)
  }
    

  //in return below are covered 3 cases, 
  //when user is not logged in and there is no post in the database
  //when user is logged in and there is no post in the database
  //when user is logged in and there is a post in the database

  return (
    <div>
      {!session && signlePostUser === null
      && (
        <ThemeProvider theme={theme}>
          <Box
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
                margin: '16px 0px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
              }}
              variant="outlined"
            >
              <Typography
                variant="h2"
                sx={{ textAlign: 'center', margin: '4% 0' }}
              >
                Sign in to see the posts.
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
          </Box>
        </ThemeProvider>
      )}
       {session && signlePostUser === undefined && (
        <ThemeProvider theme={theme}>
          <Box
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
                margin: '16px 0px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
              }}
              variant="outlined"
            >
              <Typography
                variant="h2"
                sx={{ textAlign: 'center', margin: '4% 0' }}
              >
                Post not found.
              </Typography>
              <Typography
                variant="h5"
                component="h3"
                sx={{ textAlign: 'center', marginBottom: '4%' }}
              >
                Please try again.
              </Typography>
            </Box>
            <Box
              sx={{
                margin: '0 auto',
              }}
            >
            <Button
              size="large"
              variant="contained"
              onClick={() => Router.push('/posts')}
            >
              Back to Posts
            </Button>
            </Box>
          </Box>
        </ThemeProvider>
      )}
      {session && signlePostUser !== undefined && 
      (
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignContent: 'center',
              margin:'1% 0'

            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
              }}
            >
              <Typography
                variant="body"
                sx={{ textAlign: 'center', marginTop: '1%' }}
              >
                Post Author: {signlePostUser.name}
              </Typography>
              <Typography variant="body" sx={{ textAlign: 'center' }}>
                Date Created: {dateFormatted(signlePostUser.date_created)}
              </Typography>
            </Box>

            {signlePostUser.user_id === session.user.id && 
             signlePostUser.admin && (
              <Box sx={{display:'flex', justifyContent:'end'}}>
                <Button
                  size='small'
                  variant="outlined"
                  color="primary"
                  onClick={() => handleEdit()}
                  sx={{ minWidth: '150px', margin: '4px 10px 4px 0' }}
                  startIcon={<EditIcon />}
                >
                  Edit Post
                </Button>
                <Button
                 size='small'
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete()}
                  sx={{ minWidth: '150px', margin: '4px 0 4px 0' }}
                  startIcon={<DeleteIcon />}
                >
                  Delete Post
                </Button>
              </Box>
            )}
          </Box>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0 auto',
            }}
            variant="outlined"
          >
            <Typography
              variant="h3"
              sx={{
                textAlign: 'center',
                margin: '2% 0',
                ':first-letter': { textTransform: 'capitalize' },
              }}
            >
              {signlePostUser.title}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                textAlign: 'center',
                color: 'text.secondary',
                marginBottom: '2%',
              }}
            >
              {signlePostUser.content}
            </Typography>
            <IconButton aria-label="see views">
              <RemoveRedEyeIcon />
              <Typography variant="body2" color="text.secondary">
                Views: {signlePostUser.views}
              </Typography>
            </IconButton>
          </Box>
        </ThemeProvider>
      )} 
     
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })
  const postId = context.query.id

  //query to extract the post information and user information where the post Id is equal to the id in the url
  const signlePostUser = await db
    .query(
      `SELECT "post".id as post_id, "post".date_created, "post".title, "post".views, "post".content, "user".id as user_id, "user".name, "user".admin FROM "post" INNER JOIN "user" ON "post".user_id = "user".id WHERE "post".id = ${postId}`,
    )
    .then((res) => res.rows[0])

  return {
    props: {
      session: session,
      postId: postId,
      signlePostUser: signlePostUser,
    },
  }
}
