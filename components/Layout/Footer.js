import { useState } from 'react'

import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'

import Router from 'next/router'
import LinkedinIcon from '@mui/icons-material/LinkedIn'
import GithubIcon from '@mui/icons-material/GitHub'
import { Avatar } from '@mui/material'

import Image from 'next/image'
import Img from '../../public/MartaGaworek.png'

const Footer = () => {
  const [value, setValue] = useState('LinkedIn')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <BottomNavigation
        showlabel=""
        value={value}
        sx={{
          display: `flex`,
          justifyContent: `center`,
          alignContent:'center',
          marginTop: '10px',
        }}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="LinkedIn"
        //   sx={{width: '5px'}}
          icon={<LinkedinIcon />}
          onClick={() => {
            Router.push('https://www.linkedin.com/in/marta-gaworek-197a77107/')
          }}
        />
        <BottomNavigationAction
          label="author: Marta Gaworek"
          icon={
            <Avatar aria-label="profile letter" label="none" >
              <Image src={Img} alt="author" width="74" height="74" />
            </Avatar>
          }
        ></BottomNavigationAction>
        <BottomNavigationAction
          label="GitHub"
          icon={<GithubIcon />}
          onClick={() => {
            Router.push('https://github.com/marta05')
          }}
        />
      </BottomNavigation>
    </>
  )
}

export default Footer
