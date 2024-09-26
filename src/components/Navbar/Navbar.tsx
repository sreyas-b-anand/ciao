import { Container, Flex, Heading, Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import ChatOption from "./ChatOption";
import { auth } from "../../firebase/firebase";
import useAuthContext from "../../hooks/useAuthContext";

const Navbar = () => {
 const {dispatch } = useAuthContext()
  const navigate = useNavigate();
  const handleClick = () => {
    auth
      .signOut()
      .then(() => {
        dispatch({
          type: "LOGOUT",
          payload: null,
        });
        navigate("/");
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };
  return (
    <>
      <Container
      position={'static'}
        maxWidth={"250px"}
        height={"100vh"}
        margin={0}
        backgroundColor={"#2d3748"}
        color={"#d1d5db"}
        p={8}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'space-between'}
      >
        <Flex alignItems={"flex-start"}  gap={8} flexDirection={"column"}>
          <Heading fontFamily={"Montserrat"}>CIAO</Heading>
          <Flex
            direction={"column"}
            alignItems={"flex-start"}
            justifyContent={"flex-start"}
            gap={6}
            fontFamily={"Montserrat"}
          >
            <Link to={"/dashboard"}>Home</Link>
            <ChatOption />
            <Link to={"/tasks"}>Your Tasks</Link>
          </Flex>
        </Flex>
        <Flex >
          
          <Button onClick={handleClick} bg={'inherit'} _hover={{bg:'inherit'}} fontSize={'15px'} color={'brand.error'}>Log Out</Button>
        </Flex>
      </Container>
    </>
  );
};

export default Navbar;
