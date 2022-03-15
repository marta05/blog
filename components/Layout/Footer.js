import { useState } from 'react'

import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'

import Router from 'next/router'
import LinkedinIcon from '@mui/icons-material/LinkedIn'
import GithubIcon from '@mui/icons-material/GitHub'
import { Avatar, Box } from '@mui/material'

import Image from 'next/image'
import Img from '../../public/MartaGaworek.png'

const Footer = () => {
  const [value, setValue] = useState('LinkedIn')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
    <Box sx={{
      boxShadow: 8,
      marginTop: '1%'
      }}>
      <BottomNavigation
        showlabel=""
        value={value}
        sx={{
          display: `flex`,
          justifyContent: `center`,
          alignContent:'center',
          alignItems: `center`,
          position: 'static',
          width: '100%',
          height: '100%',
          paddingTop: '5px'
        }}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="LinkedIn"
          sx={{padding:'2px'}} 
          icon={<LinkedinIcon sx={{padding:'0'}} />}
          onClick={() => {
            Router.push('https://www.linkedin.com/in/marta-gaworek-197a77107/')
          }}
        />
        <BottomNavigationAction
          label="author: Marta Gaworek"
          sx={{padding:'2px'}} 
          icon={
            <Avatar aria-label="profile letter" label="none" >
              <Image src={Img} alt="author" width="74" height="74" />
            </Avatar>
          }
        ></BottomNavigationAction>
        <BottomNavigationAction
          label="GitHub"
          sx={{padding:'2px'}} 

          icon={<GithubIcon />}
          onClick={() => {
            Router.push('https://github.com/marta05')
          }}
        />
      </BottomNavigation>
      </Box>
    </>
  )
}

export default Footer
