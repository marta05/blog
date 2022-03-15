import {useState, useEffect} from 'react';
import { getSession } from 'next-auth/react';
import axios from 'axios';
import db from '../../../lib/db';

import { Box, TextField, Toolbar, Button } from '@mui/material';
import router from 'next/router';

export default function Edit({session, postId, singlePostUser}) {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    console.log(singlePostUser)
    
    const handleSubmit = () => {
        axios.put('/api/edit',
        {
            title: title,
            content: content,
            postId: postId,
        })
        .then(function (response) {
            console.log(response)
            router.push('/posts/[id]', `/posts/${response.data.id}`)
        }
        )
    }

    useEffect(() => {
        if(singlePostUser) {
            setTitle(singlePostUser.title)
            setContent(singlePostUser.content)
        }
    }, [singlePostUser])
  

  return (
    <Toolbar sx={{marginTop:'3%'}}>
      <Box component="form" noValidate autoComplete="off" sx={{width:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignContent:'center'}}>
        <TextField
          id="outlined-textarea"
          label="Post Title"
          placeholder="Placeholder"
          multiline
          fullWidth
          minRows={2}
          sx={{marginBottom:'3%'}}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          id="outlined-textarea"
          label="Post Content"
          placeholder="Placeholder"
          multiline
          fullWidth
          minRows={14}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'center',
                margin:'5% 0 2% 0',
                }}
            >
        <Button
            size='large'
            variant="contained"
            color="primary"
            sx={{marginRight:'2%', width:'120px'}}
            onClick={() => handleSubmit()}
        >SAVE</Button>
        <Button
            size='large'
            variant="outlined"
            color="primary"
            sx={{width:'120px'}}
            onClick={() => router.push('/posts')}
        >CANCEL</Button>
        </Box>
      </Box>
    </Toolbar>
  )
}

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req })

    const postId = context.query.id
    
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