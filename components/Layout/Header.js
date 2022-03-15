import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/system";
import Image from "next/image";
import Ninja from '../../public/ninja2.png'

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const Header = () => {
  return (
    <>
      <AppBar position="fixed" >
        <Toolbar>
          <Container
            maxWidth="lg"
            sx={{ display: `flex`, justifyContent: `space-between`}}
            
          >
            <Image src={Ninja} alt="ninja" width="60" height="45" />
          </Container>
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default Header;