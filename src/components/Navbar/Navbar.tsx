import { Container, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ChatOption from "./ChatOption";

const Navbar = () => {
  return (
    <>
      <Container
        maxWidth={"250px"}
        height={"100vh"}
        margin={0}
        backgroundColor={"#2d3748"}
        color={"#d1d5db"}
        p={8}
      >
        <Flex alignItems={"flex-start"} gap={8} flexDirection={"column"}>
          <Heading fontFamily={"Montserrat"}>CIAO</Heading>
          <Flex
            direction={"column"}
            alignItems={"flex-start"}
            justifyContent={"flex-start"}
            gap={6}
            fontFamily={"Montserrat"}
          >
            <Link to={"/dashboard"}>Home</Link>
            <ChatOption/>
            <Link to={"/tasks"}>Your Tasks</Link>
          </Flex>
        </Flex>
      </Container>
    </>
  );
};

export default Navbar;
