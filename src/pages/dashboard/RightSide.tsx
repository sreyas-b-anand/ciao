import { Flex, Stack } from "@chakra-ui/react";
import ChatNavCard from "../../components/ChatNav/ChatNavCard";
import WeatherCard from "../../components/Weather/WeatherCard";
import Welcome from "../../components/welcome/Welcome";



const RightSide = () => {


  return (
    <Flex direction={"column"} gap={1} flex={1} p={3} fontFamily={"Montserrat"}>
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
          gap={8}
          alignItems={"center"}
          flexWrap={"wrap"}
          justifyContent={"center"}
        >
          <ChatNavCard />
          <WeatherCard />
          {/*}<Flex flex={1} maxW={'830px'} maxHeight={'200px'} bg={'brand.primary'} textColor={'brand.textPrimary'} borderRadius={5} mt={3} alignItems={'center'} justifyContent={'center'}  gap={3} direction={'column'}  p={4}  >
            <Text borderBottom={'solid white 1px'}  textAlign={'center'} textColor={'brand.textPrimary'} p={1} fontSize={22}>Upcoming Tasks</Text>
            <Flex color={'brand.textPrimary'} flexWrap={'wrap'} alignItems={'center'} justifyContent={'center'} gap={3} flex={1} p={3}  >
            {taskInfo.map((task, index) => (
              <TaskCardDashboard key={index} task={task} />
            ))}
            </Flex>
          </Flex>
            */}
        </Flex>
      </Stack>
    </Flex>
  );
};

export default RightSide;
