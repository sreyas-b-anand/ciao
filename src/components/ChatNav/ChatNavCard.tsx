import { Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Link as ChakraLink, Text, Box, Image } from "@chakra-ui/react";
import logo from "./images/ch.jpeg";
const ChatNavCard = () => {
  return (
    <>
      <Flex
        boxShadow={3}
        borderRadius={8}
        p={4}
        fontFamily={"Montserrat"}
        minHeight={"250px"}
        maxHeight={"280px"}
        width={"400px"}
        backgroundColor={"brand.primary"}
        flexDirection={"column"}
      >
        <Flex
          width={"100%"}
          height={"90%"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
          p={2}
          gap={8}
        >
          <Box
            p={3}
            px={8}
            backgroundColor={"brand.background"}
            borderRadius={6}
            display={"flex"}
            alignItems={"baseline"}
            gap={3}
            flexDirection={"column"}
          >
            <Flex
              width={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Image src={logo} alt="logo" height={"40px"} width={"40px"} />
            </Flex>
            <Text color={"brand.textPrimary"} textAlign={"center"}>
              Hello! How can I assist you today?{" "}
            </Text>
          </Box>

          <ChakraLink
            borderRadius={7}
            maxWidth={"150px"}
            backgroundColor={"brand.secondary"}
            p={2}
            color={"brand.textPrimary"}
            textDecoration={"none"}
            _hover={{ textDecoration: "none", color: "brand.textSecondary" }}
          >
            <Link to={"/chat"}>Chat with CIAO</Link>
          </ChakraLink>
        </Flex>
      </Flex>
    </>
  );
};

export default ChatNavCard;
