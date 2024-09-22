import { Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <Flex
        fontFamily={"Montserrat"}
        width={"100vw"}
        alignItems={"center"}
        justifyContent={"center"}
        height={"100vh"}
      >
        <Text display={"flex"} alignItems={"baseline"} gap={1}>
          Oops!!! page not found.Return to{" "}
          <Text textDecoration={"underline"}>
            <Link to={"/dashboard"}> Home</Link>{" "}
          </Text>
        </Text>
      </Flex>
    </>
  );
};

export default NotFound;
