import {useState} from 'react';
import axios from 'axios';
import router from "next/router";

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { InputLabel, FormControl, MenuItem, Box, Button, Typography, Modal, Avatar, CssBaseline,
  TextField, Link, Grid, Container, Select } from '@mui/material'

import { getSession, signIn, signOut, useSession } from 'next-auth/react'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 320,
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const theme = createTheme()


export default function SignIn(props) {

  const [admin, setAdmin] = useState("")
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [userRole, setUserRole] = useState('')

  const { open, setOpen } = props
  const handleClose = () => setOpen(false)

  const handleSubmission = async () => {
    await createUser()
    await alert('User created!, please sign in on the next page')
    await router.push('/api/auth/signin')
  }

  const createUser = async () => {
    try{
      axios.post('/api/auth/signup', {
        admin: admin,
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword
      } )
      .then((response) => {
        console.log(response)
      }
    )
    } catch(err){
      console.log(err)
    }
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <Box
                  component="form"
                  noValidate
                  // onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="given-name"
                        required
                        fullWidth
                        id="name"
                        label="First Name"
                        autoFocus
                        value={name}
                        onChange={(event)=>{
                          setName(event.target.value)
                          console.log(name)
                        }}
                        inputProps={{ maxLength: 12 }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                        value={email}
                        onChange={(event)=>{
                          setEmail(event.target.value)
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                      helperText="4 characters minimum"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(event)=>{
                          setPassword(event.target.value)
                        }}
   
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(event)=>{
                          setConfirmPassword(event.target.value)
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth sx={{marginBottom:'2%'}}>
                        <InputLabel id="select-admin-role" required>
                          Select User Role
                        </InputLabel>
                        <Select
                          // label="Select User Role"
                          sx={{marginBottom:'2%'}}  
                          fullWidth
                          labelId="select-admin-role"
                          id="select-admin-role"
                          value={admin}
                          onChange={(event)=>{
                            setAdmin(event.target.value)
                          }}
                          placeholder="Select User Role"
                          label="Select User Role"
                        >
                          <MenuItem
                            value={'TRUE'}
                            onSelect={()=>{
                              setAdmin(TRUE);
                            }}
                          >Admin</MenuItem>
                          <MenuItem
                            value={'FALSE'}
                            onSelect={()=>{
                              setAdmin(FALSE);
                            }}
                          >
                            Standard</MenuItem>
                        </Select>
                      </FormControl>
                      <Typography variant="body2" color="textSecondary">
                        *Standard user can view the posts of others
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                        *Admin user can view, add, edit, delete the posts
                        </Typography>
                      {/* add selection login if the user wants to be an admin */}
                    </Grid>
                  </Grid>
                  <Button
                    // type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => {
                      handleSubmission()
                    }}
                  >
                    Sign Up
                  </Button>
                  <Typography variant="body2" color="textSecondary" sx={{marginTop: '1%', color:'red', textAlign: 'center'}}>
                        After successfull registration, you will be redirected to the login page
                  </Typography>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </Box>
      </Modal>
    </div>
  )
}
