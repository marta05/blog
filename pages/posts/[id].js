import { getSession } from 'next-auth/react'
import db from '../../lib/db'
import axios from 'axios'
import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import {Box,Typography,IconButton,Button,ThemeProvider, Toolbar} from '@mui/material'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Router from 'next/router'
import Unauthorized from '../../components/Unauthorized/Unauthorized'


export default function PostId({ session, postId, singlePostUser }) {

  //convert the date object to a readable format
  const dateFormatted = (date) => {
    const dateObj = new Date(date)
    const month = dateObj.getUTCMonth() + 1
    const day = dateObj.getUTCDate()
    const year = dateObj.getUTCFullYear()
    return `${day}/${month}/${year}`
  }

  //activate responsive font sizes
  let theme = createTheme()
  theme = responsiveFontSizes(theme)

  //delete post and reroute user to /posts page
  const handleDelete = async () => {
    const confirmation = window.confirm(
      'Are you sure you want to delete this post?',
    )
    if (confirmation) {
      await deletePost()
      Router.push('/posts')
    } else {
      return null
    }
  }

  const deletePost = async () => {
    try {
      await axios.delete(`/api/post`, {
        data: { postId: postId },
      })
      Router.push('/posts')
    } catch (err) {
      console.log(err)
    }
  }

  //On click of edit button, reroute user to /posts/edit/[id] page
  const handleEdit = async () => {
    Router.push('/posts/edit/[id]', `/posts/edit/${postId}`)
  }

  //in return below are covered 3 cases,
  //when user is not logged in
  //when user is logged in and there is no post in the database/it doesn't exist
  //when user is logged in and there is a post in the database

  return (
    <div>
      {!session && <Unauthorized />}
      {session && singlePostUser === undefined && (
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
      {session && singlePostUser !== undefined && (
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              alignContent: 'center',
              margin: '1% 0',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="body"
                sx={{ textAlign: 'center', marginTop: '1%' }}
              >
                Post Author: {singlePostUser.name}
              </Typography>
              <Typography variant="body" sx={{ textAlign: 'center' }}>
                Date Created: {dateFormatted(singlePostUser.date_created)}
              </Typography>
            </Box>

            {singlePostUser.user_id === session.user.id &&
              singlePostUser.admin && (
                <Toolbar
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    // alignContent: 'end',
                    alignItems: 'center',
                    padding: '0px',

                    justifyContent: 'center',
                  }}
                >
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEdit()}
                    sx={{ minWidth: '130px', height: '40px', marginLeft:'10px',}}
                    startIcon={<EditIcon />}
                  >
                    Edit Post
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete()}
                    sx={{ minWidth: '130px', marginLeft:'10px',  height: '40px'}}
                    startIcon={<DeleteIcon />}
                  >
                    Delete Post
                  </Button>
                </Toolbar>
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
              {singlePostUser.title}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                textAlign: 'center',
                color: 'text.secondary',
                marginBottom: '2%',
              }}
            >
              {singlePostUser.content}
            </Typography>
            <IconButton aria-label="see views">
              <RemoveRedEyeIcon />
              <Typography variant="body2" color="text.secondary">
                Views: {singlePostUser.views}
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

  //when the post page is rendered, the view count is incremented by 1
  const updateViews = await db.query(
    `
    UPDATE "post"
    SET views = views + 1
    WHERE id = $1
    `,
    [postId],
  )

  //query to extract the post information and user information where the post Id is equal to the id in the url
  const singlePostUser = await db
    .query(
      `SELECT "post".id as post_id, "post".date_created, "post".title, "post".views, "post".content, "user".id as user_id, "user".name, "user".admin FROM "post" INNER JOIN "user" ON "post".user_id = "user".id WHERE "post".id = ${postId}`,
    )
    .then((res) => res.rows[0])

  return {
    props: {
      session: session,
      postId: postId,
      singlePostUser: singlePostUser,
    },
  }
}
