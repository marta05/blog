import {useState} from 'react';
import BottomNavigation from "@mui/material/BottomNavigation";
import Router from 'next/router';

import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LinkedinIcon from '@mui/icons-material/LinkedIn';
import GithubIcon from '@mui/icons-material/GitHub';
import { Avatar } from '@mui/material';
import Image from 'next/image';
import Img from '../../public/MartaGaworek.png'

const Footer = () => {
 const [value, setValue] = useState(0);

  return (
    <>
        <BottomNavigation
        showLabels
        value={value}
        sx={{ display: `flex`, justifyContent: `center`, padding: '5px'}}
        onChange={(event, newValue) => {
            setValue(newValue);
        }}
        >
            <BottomNavigationAction label="Linkedin" icon={<LinkedinIcon />} onClick={()=>{
                Router.push('https://www.linkedin.com/in/marta-gaworek-197a77107/')
            }} />
            <Avatar
            aria-label="profile letter"
          >
              <Image src={Img} alt="me" width="74" height="74" />
          </Avatar>
            <BottomNavigationAction label="Github" icon={<GithubIcon />} 
            onClick={()=>{
                Router.push('https://github.com/marta05')
            }}/>
        </BottomNavigation>
    </>
  );
};

export default Footer;