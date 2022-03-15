import CardMedia from '@mui/material/CardMedia';
import { blue } from "@mui/material/colors";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import router from 'next/router';

import {Card, CardHeader, CardContent, CardActions, Avatar, 
IconButton, Typography, Button } from '@mui/material';


export default function Post({
    title,
    views,
    userName,
    dateCreated,
    postId
}) {
  console.log(dateCreated)
  return (
    <Card sx={{ minWidth:320, maxWidth: 345, minHeight: 220, marginBottom:'2%' }}>
           <CardHeader
      sx={{paddingBottom:'5px'}}
        avatar={
          <Avatar
            sx={{ bgcolor: blue[500]}}
            aria-label="profile letter"
          >
          {/* extract the first letter of user name */}
          </Avatar>
        }
        title={userName}
        subheader={dateCreated}
      />
      {/* <CardMedia
        component="img"
        height="50"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
      <CardContent>
        <Typography variant="body2" color="text.secondary" sx={{maxHeight:'60px', overflow: 'hidden'}}>
          {title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{display:'flex', justifyContent:'space-between' }}>
        <IconButton aria-label="see views">
          <RemoveRedEyeIcon/>
          <Typography variant="body2" color="text.secondary" sx={{paddingLeft:'10px'}}>
            {views} Views
          </Typography>
        </IconButton>
        <Button
          onClick={() => {
            router.push('/posts/[id]', `/posts/${postId}`);
          }}
        >
            ...Read More
          </Button>
      </CardActions>
    </Card>
  );
}
