import { signIn } from 'next-auth/react'
import { useState } from 'react'
import Register from '../../components/Registration/Registration'
import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import {
  Box,
  Toolbar,
  Typography,
  Button,
  ThemeProvider,
} from '@mui/material'

export default function Unauthorized() {

  //opens modal
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }

  //activate responsive font sizes
  let theme = createTheme()
  theme = responsiveFontSizes(theme)

  return (
    <ThemeProvider theme={theme}>
      <Toolbar
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
            // margin: '16px 0px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center',
          }}
          variant="outlined"
        >
          <Typography
            variant="h2"
            component="h3"
            sx={{ textAlign: 'center', margin: '4% 0' }}
          >
            You are not authorized to view this page.
          </Typography>
          <Typography
            variant="h5"
            component="h3"
            sx={{ textAlign: 'center', marginBottom: '4%' }}
          ></Typography>
        </Box>
        <Box
          style={{
            width: '100%',
            display: 'flex',

            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <Button
            size="large"
            variant="contained"
            onClick={() => signIn({ redirect: '/api/auth/signin' })}
            sx={{ width: '120px', marginRight: '10px' }}
          >
            Sign in
          </Button>
          <Button
            variant="contained"
            sx={{ width: '120px' }}
            size="large"
            onClick={() => {
              handleOpen()
            }}
          >
            Register
          </Button>
        </Box>
        <Register open={open} setOpen={setOpen} />
      </Toolbar>
    </ThemeProvider>
  )
}
