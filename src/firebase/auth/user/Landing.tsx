import { Box, Container, Text, Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <Container
        minW={"100vw"}
        minH={"100vh"}
        backgroundColor="brand.background"
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
          gap={3}
          padding={"60px"}
          textAlign={"center"}
        >
          <Text
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            fontSize={"80px"}
            color={"white"}
            fontFamily={"Montserrat"}
            fontWeight={600}
          >
            Welcome to CIAO
          </Text>
          <Text
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            color="brand.textSecondary"
            fontSize={"20px"}
            fontFamily={"Montserrat"}
          >
            Discover the power of personalized assistance with our AI chatbot.
          </Text>
          <Text
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            color="brand.textSecondary"
            fontSize={"15px"}
            fontFamily={"Montserrat"}
            textAlign={"center"}
          >
            Whether you're managing tasks, setting reminders, or seeking
            friendly advice, our chatbot is here to make your day easier and
            more productive. Dive in and start your journey with seamless,
            intelligent interactions!
          </Text>
        </Box>

        <Box display={"flex"} alignItems={"center"} gap={5}>
          <ChakraLink
          fontFamily={"Montserrat"}
            textDecoration={"none"}
            p={2}
            _hover={{ textDecoration: "none", color: "brand.textSecondary" }}
            background="brand.primary"
            color="brand.textPrimary"
            borderRadius={"10px"}
          >
            <Link to={"user"}>Get Started</Link>
          </ChakraLink>
          <ChakraLink
          fontFamily={"Montserrat"}
            _hover={{ textDecoration: "none", color: "brand.textSecondary" }}
            textDecoration={"none"}
            p={2}
            px={3}
            background="brand.primary"
            color="brand.textPrimary"
            borderRadius={"10px"}
          >
            <Link to={"https://github.com/sreyas-b-anand/sreyas-b-anand"} target="_blank" rel="noopener ">GitHub</Link>
          </ChakraLink>
        </Box>
      </Container>
    </>
  );
};

export default Landing;
