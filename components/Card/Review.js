import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Rating,
  Typography,
} from '@mui/material'
import { orange } from '@mui/material/colors'

const ReviewShanen = ({ initials, title, text, value }) => {
  return (
    <Card
      sx={{ width:'340px', minHeight:'250px', margin: '3% 0'}}
    >
      <CardHeader
        sx={{ paddingBottom: '5px'}}
        avatar={
          <Avatar sx={{ bgcolor: orange[500] }} aria-label="profile letter">
            {initials}
          </Avatar>
        }
        title={title}
      />
      <CardContent>
        <Rating value={value} precision={0.5} readOnly />
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default ReviewShanen
