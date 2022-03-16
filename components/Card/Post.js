import { blue } from '@mui/material/colors'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import router from 'next/router'

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Button,
} from '@mui/material'

export default function Post({verifiedSession, title, views, userName, dateCreated, postId }) {
  return (
    <Card
      elevation={4}
      sx={{ width: '340px', minHeight: 220, marginBottom: '2%' }}
    >
      <CardHeader
        sx={{ paddingBottom: '5px' }}
        avatar={
          <Avatar sx={{ bgcolor: blue[500] }} aria-label="profile letter">
          </Avatar>
        }
        title={userName}
        subheader={dateCreated}
        action={
          verifiedSession ? 
          <Button
          variant='outlined'
          onClick={() => router.push(`/posts/edit/${postId}`)}
        >Edit</Button> : null
          }
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            maxHeight: '60px',
            overflow: 'hidden',
            ':first-letter': { textTransform: 'capitalize' },
          }}
        >
          {title}
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <IconButton aria-label="see views">
          <RemoveRedEyeIcon />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ paddingLeft: '10px' }}
          >
            {views} Views
          </Typography>
        </IconButton>
        <Button
          onClick={() => {
            router.push('/posts/[id]', `/posts/${postId}`)
          }}
        >
          ...Read More
        </Button>
      </CardActions>
    </Card>
  )
}
