import { Flex } from "@chakra-ui/react";
import ChatNavCard from "../../components/ChatNav/ChatNavCard";
import WeatherCard from "../../components/Weather/WeatherCard";
import Welcome from "../../components/welcome/Welcome";

const RightSide = () => {
  return (
    <>
      <Flex direction={"column"} alignItems={"center"} p={4} px={8} gap={"3"} width={"auto"} height={'100vh'}  flexWrap={'wrap'}>
        <Welcome />
        <Flex direction={"row"} gap={6} alignItems={"center"} flexWrap={'wrap'} p={5} >
          <ChatNavCard />
          <WeatherCard />
        </Flex>
      </Flex>
    </>
  );
};

export default RightSide;
 