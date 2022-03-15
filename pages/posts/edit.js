import {Box, TextField} from '@mui/material';

export default function Edit(){

return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1},
      }}
      noValidate
      autoComplete="off"
    >
                <TextField
          id="outlined-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          multiline
        />

    </Box>
)
}