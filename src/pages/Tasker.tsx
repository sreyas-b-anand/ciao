import { Flex, Text } from "@chakra-ui/react";
import Navbar from "../components/Navbar/Navbar";
import useAuthContext from "../hooks/useAuthContext";
import Tabbar from "../components/Navbar/Tabbar";
import TaskCard from "../components/TaskerCard/TaskCard";
const Tasker = () => {
  const { user } = useAuthContext();
  console.log("in tasker", user);
  const arr = [1 , 2, 3 , 4]
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
        <Flex flex={1} direction={'column'} p={3}>
          <Tabbar flexProp={1}/>
          {user ? (
            <>
              <Flex alignItems={'center'} justifyContent={'center'} gap={3} >
                {arr.map((el , index)=>{
                  return <TaskCard el={el} key={index}/>
                })}
              </Flex>
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
