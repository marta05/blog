import { ThemeProvider } from '@mui/private-theming'
import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import {Toolbar, Box, Typography, IconButton} from '@mui/material'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import { palette } from '@mui/system';

import {getSession} from 'next-auth/react'
import db from '../../lib/db'

export default function PostId({session, postId, signlePostUser}){

    const dateFormatted = (date) => {
        const dateObj = new Date(date)
        const month = dateObj.getUTCMonth() + 1
        const day = dateObj.getUTCDate()
        const year = dateObj.getUTCFullYear()
        return `${month}/${day}/${year}`
      }

    let theme = createTheme()
    theme = responsiveFontSizes(theme)

    // USER can delete the post only if session.id is equal to singlePostUser.userId

    
    return(
        <ThemeProvider theme={theme}>
            <Toolbar sx={{display:'flex', justifyContent:'space-between', alignContent:'center' }}>
                <Box sx={{display:'flex', flexDirection:'column', alignItems:'start'}}>
                    <Typography variant="body" sx={{textAlign: 'center', marginTop:'1%'}}>
                    Post Author: {signlePostUser.name}
                    </Typography>  
                    <Typography variant="body" sx={{textAlign: 'center'}}>
                        Date Created: {dateFormatted(signlePostUser.date_created)}
                    </Typography>
                </Box>
                <IconButton aria-label="see views">
                    <RemoveRedEyeIcon/>
                    <Typography variant="body2" color="text.secondary" >
                        Views: {signlePostUser.views}
                    </Typography>
                </IconButton>
            </Toolbar>
                <Box style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '0 auto'}} variant="outlined">
                    <Typography variant="h3" sx={{textAlign: 'center',  margin: '2% 0', ":first-letter":{textTransform:'capitalize'} }}>
                        {signlePostUser.title}
                    </Typography>
                    <Typography variant="h5" sx={{textAlign: 'center', color:'text.secondary', marginBottom: '2%'}}>
                        {signlePostUser.content}
                    </Typography>
                </Box>
        </ThemeProvider>
    )
}

export async function getServerSideProps(context){
    const session = await getSession({req: context.req})
    const postId = context.query.id

    //query to extract the post information and user information where the post Id is equal to the id in the url
    const signlePostUser = await db.query(`SELECT "post".id as post_id, "post".date_created, "post".title, "post".views, "post".content, "user".id as user_id, "user".name, "user".admin FROM "post" INNER JOIN "user" ON "post".user_id = "user".id WHERE "post".id = ${postId}`)
    .then(res => res.rows[0])
    
 return {
     props: {
            session: session,
            postId: postId,
            signlePostUser: signlePostUser
     }
 }
}