import {useState} from 'react';
import { getSession } from 'next-auth/react';
import axios from 'axios';

import { Box, TextField, Toolbar, Button } from '@mui/material';
import router from 'next/router';

export default function Edit({session}) {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async () => {
        await createPost()
        // router.push('/posts')
    }

    const createPost = () => {
        axios.post('/api/edit',
        {
          title: title,
          content: content,
          userId: session.user.id,
          dateCreated: new Date(),        
        })
        .then(function (response) {
            router.push('/posts/[id]', `/posts/${response.data.id}`)
            }
        )
    }
  

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
        >Save</Button>
        <Button
            size='large'
            variant="outlined"
            color="primary"
            sx={{width:'120px'}}
            onClick={() => handleDelete()}
        >CANCEL</Button>
        </Box>
      </Box>
    </Toolbar>
  )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    console.log('session', session)
    
        return {
            props: {
                session
            }
        }
}