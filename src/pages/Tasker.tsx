import { Flex, Text } from "@chakra-ui/react";
import Navbar from "../components/Navbar/Navbar";
import useAuthContext from "../hooks/useAuthContext";
import Tabbar from "../components/Navbar/Tabbar";
const Tasker = () => {
  const { user } = useAuthContext();
  console.log("in tasker", user);
  return (
    <>
      <Flex
        minWidth={"100vw"}
        minHeight={"100vh"}
        padding={0}
        backgroundColor={"brand.background"}
        direction={"row"}
      >
        <Navbar />
        <Flex flex={1} direction={'column'}>
          <Tabbar flexProp={1}/>
          {user ? (
            <>
              <Text textAlign={"center"} color={"brand.textPrimary"}>
                Task will appear here
              </Text>
            </>
          ) : (
            <>
              <Flex flex={1} alignItems={"center"} justifyContent={"center"}>
                <Text textAlign={"center"} color={"brand.textPrimary"}>
                  Login to use
                </Text>
              </Flex>
            </>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default Tasker;
