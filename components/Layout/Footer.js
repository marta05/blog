import {useState} from 'react';
import BottomNavigation from "@mui/material/BottomNavigation";
import Router from 'next/router';

import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LinkedinIcon from '@mui/icons-material/LinkedIn';
import GithubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
 const [value, setValue] = useState(0);

  return (
    <>
        <BottomNavigation
        showLabels
        value={value}
        sx={{ display: `flex`, justifyContent: `center`}}
        onChange={(event, newValue) => {
            setValue(newValue);
        }}
        >
            <BottomNavigationAction label="Linkedin" icon={<LinkedinIcon />} onClick={()=>{
                Router.push('https://www.linkedin.com/in/marta-gaworek-197a77107/')
            }} />
            <BottomNavigationAction label="Github" icon={<GithubIcon />} 
            onClick={()=>{
                Router.push('https://github.com/marta05')
            }}/>
        </BottomNavigation>
    </>
  );
};

export default Footer;