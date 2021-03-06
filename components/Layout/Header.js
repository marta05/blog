import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import { styled } from '@mui/system'
import Image from 'next/image'
import Ninja from '../../public/ninja2.png'
import Router from 'next/router'
import { MenuItem } from '@mui/material'
import {signIn, signOut, useSession } from 'next-auth/react'


export default function Header() {
  const { data: session } = useSession()
  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar)

  return (
    <div>
      {!session && (
        <>
          <AppBar position="fixed">
            <Toolbar>
              <Container
                maxWidth="lg"
                sx={{
                  display: `flex`,
                  justifyContent: `space-between`,
                  ':hover': { cursor: 'pointer' },
                }}
                onClick={() => Router.push('/')}
              >
                <Image src={Ninja} alt="ninja" width="60" height="45" />
              </Container>
              <MenuItem
                onClick={() =>
                  signIn('CredentialProvider', {
                    callbackUrl: '/posts',
                  })
                }
              >
                SIGN IN
              </MenuItem>
            </Toolbar>
          </AppBar>
          <Offset />
        </>
      )}
      {session && (
        <>
          <AppBar position="fixed">
            <Toolbar>
              <Container
                maxWidth="lg"
                sx={{
                  display: `flex`,
                  justifyContent: `space-between`,
                  ':hover': { cursor: 'pointer' },
                }}
                onClick={() => Router.push('/')}
              >
                <Image src={Ninja} alt="ninja" width="60" height="45" />
              </Container>
              <MenuItem onClick={() => Router.push('/posts')}>HOME</MenuItem>
              <MenuItem
                onClick={() =>
                  signOut({ callbackUrl: '/' })
                }
              >
                SIGN OUT
              </MenuItem>
            </Toolbar>
          </AppBar>
          <Offset />
        </>
      )}
    </div>
  )
}
