import { getSession, signIn } from 'next-auth/react'
import { Toolbar, Typography, ThemeProvider, Button } from '@mui/material'
import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { useState } from 'react'
import Review from '../components/Card/Review'
import Register from '../components/Registration/Registration'
import Image from 'next/image'
import Ninja from '../public/ninja1.png'
import router from 'next/router'


export default function Home({ session }) {
  //opens modal
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }

  //responsive font sizes
  let theme = createTheme()
  theme = responsiveFontSizes(theme)

  return (
    <div>
      <Toolbar
        sx={{
          display: `flex`,
          flexDirection: 'column',
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        <ThemeProvider theme={theme}>
          <Typography
            variant="h3"
            color="info.dark"
            sx={{
              fontWeight: 700,
              marginTop: '1.5%',
              marginBottom: '2%',
              textAlign: 'center',
            }}
          >
            Welcome to BlogoNinja!
          </Typography>
          <Image src={Ninja} alt="ninja" width="200" height="120" />
          
          {!session && (
            <Toolbar
              sx={{ marginTop: '2%', width: '100%', justifyContent: 'center' }}
            >
              <Button
                variant="contained"
                size="large"
                sx={{maxHeight: '50px', minWidth:'80px', whiteSpace: 'nowrap'}}
                onClick={() => {
                  signIn('CredentialProvider', {
                    callbackUrl: '/posts',
                  })
                }}
              >
                Sign in
              </Button>
              <Typography
                variant="h5"
                sx={{ paddingLeft: '2%',paddingRight: '2%' }}
              >
                OR
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{minWidth:'80px'}}
                onClick={() => {
                  handleOpen()
                }}
              >
                Register
              </Button>
            </Toolbar>
          )}
          {session && (
            <Toolbar
              sx={{ marginTop: '2%', width: '100%', justifyContent: 'center' }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  router.push('/posts')
                }}
              >
                Home Page
              </Button>
            </Toolbar>
          )}
          <Typography
            variant="p"
            color="info.dark"
            sx={{
              fontWeight: 400,
              marginTop: '2%',
              marginBottom: '1%',
              textAlign: 'center',
            }}
          >
            Join our community of bloggers, share your thoughts and let the
            creativity take over!
          </Typography>
        </ThemeProvider>
      </Toolbar>
      <ThemeProvider theme={theme}>
      <Toolbar
        sx={{
          display: `flex`,
          width: '100%',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
        }}
      >
        <Review
          initials={'MG'}
          title={'Marta'}
          text={
            "One of the greates blogging apps I have found so far, can't stress enough how much I enjoy it's simplicity and design! The customer service is extremaly fast with responses and the extra feature to have an admin panel covers it all!"
          }
          value={5}

        />
        <Review
          initials={'AC'}
          title={'Andrea'}
          text={
            'I was recommended to use this platform by a friend, after using it for almost a year I must say it covers all the functionality I look for in the blogging app. The only minus I would point out is the design of their login page but it is not a big issue overall.'
          }
          value={4}
        />
        <Review
          initials={'CE'}
          title={'Carol'}
          text={
            "Game changer! Easy to navigate and you don't get lost with the amount of features that most of the platforms try to cover these day. It's nice that it specialises in one thing - blog posts, and it's all that I've been looking for!"
          }
          value={4.5}
        />
      </Toolbar>
      </ThemeProvider>
      <Register open={open} setOpen={setOpen} />
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  return {
    props: {
      session,
    },
  }
}
