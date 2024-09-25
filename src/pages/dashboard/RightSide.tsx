import { Flex, Stack } from "@chakra-ui/react";
import ChatNavCard from "../../components/ChatNav/ChatNavCard";
import WeatherCard from "../../components/Weather/WeatherCard";
import Welcome from "../../components/welcome/Welcome";


const RightSide = () => {
  return (
    <>
      <Flex direction={"column"} gap={1} flex={1} p={3}>
        
        <Stack
          direction={"column"}
          alignItems={"center"}
          p={2}
          px={4}
          gap={"3"}
          minHeight={"100vh"}
          minW={"100%"}
          flexWrap={"wrap"}
        >
          <Welcome />
          <Flex
            gap={6}
            alignItems={"center"}
            flexWrap={"wrap"}
            justifyContent={"center"}
          >
            <ChatNavCard />
            <WeatherCard />
          </Flex>
        </Stack>
      </Flex>
    </>
  );
};

export default RightSide;
