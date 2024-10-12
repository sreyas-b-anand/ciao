import { Container, Flex, Heading, Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import AccordionLink from "./ChatOption";
import { auth } from "../../firebase/firebase";
import useAuthContext from "../../hooks/useAuthContext";
import useTaskContext from "../../hooks/useTaskContext";

const Navbar = () => {
  const link = [
    {
      title: "Chat",
      href1: "/chat",
      href2: "/history",
      cover1: "Chat with CIAO",
      cover2: "Your History",
    },
    {
      title: "To-Do s",
      href1: "/your-tasks",
      href2: "",
      cover1: "Your To-Do s",
      cover2: "",
    },
  ];
  const authContext = useAuthContext();
  const taskcontext = useTaskContext();
  const navigate = useNavigate();
  const handleClick = () => {
    auth
      .signOut()
      .then(() => {
        authContext.dispatch({
          type: "LOGOUT",
          payload: null,
        });
        taskcontext.dispatch({
          type: "GET_TASKS",
          payload: [],
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
      zIndex={300}
        maxWidth={"250px"}
        height={"100vh"}
        margin={0}
        backgroundColor={"blue.800"}
        color={"#d1d5db"}
        p={8}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
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
            <Link className="pt-8" to={"/dashboard"}>Home</Link>
            {link.map((link  , index) => {
              return <AccordionLink key={index} title={link.title} href1={link.href1}  href2={link.href2} cover1={link.cover1} cover2={link.cover2}/>;
            })}
          </Flex>
        </Flex>
        <Flex>
          <Button
            onClick={handleClick}
            bg={"inherit"}
            _hover={{ bg: "inherit" }}
            fontSize={"15px"}
            color={"brand.error"}
          >
            Log Out
          </Button>
        </Flex>
      </Container>
    </>
  );
};

export default Navbar;
