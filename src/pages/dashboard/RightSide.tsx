import { Flex } from "@chakra-ui/react";
import ChatNavCard from "../../components/ChatNav/ChatNavCard";
import WeatherCard from "../../components/Weather/WeatherCard";
import Welcome from "../../components/welcome/Welcome";
import Tabbar from "../../components/Navbar/Tabbar";

const RightSide = () => {
  return (
    <>
      <Flex direction={"column"} gap={1} flex={1} p={3}>
        <Tabbar />
        <Flex
          direction={"column"}
          alignItems={"center"}
          p={4}
          px={8}
          gap={"3"}
          width={"100%"}
          height={"100vh"}
          flexWrap={"wrap"}
        >
          <Welcome />
          <Flex
            
            gap={6}
            alignItems={"center"}
            flexWrap={"wrap"}
            p={5}
          >
            <ChatNavCard />
            <WeatherCard />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default RightSide;
