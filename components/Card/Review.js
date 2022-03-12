import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Rating,
  Typography,
} from "@mui/material";
import { orange } from "@mui/material/colors";

const ReviewShanen = ({
    initials,
    title,
    text,
    value
    }
) => {
  return (
    <Card sx={{ maxWidth: 345, minWidth: 300, marginTop: '2%', height:'265px' }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: orange[500] }}
            aria-label="profile letter"
          >
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
  );
};

export default ReviewShanen;