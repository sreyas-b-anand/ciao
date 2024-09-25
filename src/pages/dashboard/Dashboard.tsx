import { Flex } from "@chakra-ui/react";
import Navbar from "../../components/Navbar/Navbar";
import RightSide from "./RightSide";

import useAuthContext from "../../hooks/useAuthContext";
import Tabbar from "../../components/Navbar/Tabbar";

const Dashboard = () => {
  const { user } = useAuthContext();

  //console.log(user?.email); ////////////////////////
  return (
    <>
      <Flex
        flexWrap={"wrap"}
        gap={2}
        minWidth={"100vw"}
        minHeight={"100vh"}
        padding={0}
        backgroundColor={"brand.background"}
      >
        <Navbar />
        {user && (
          <Flex flex={1} flexDirection={"column"} p={3}>
            <Tabbar flexProp={1} />
            <RightSide />
          </Flex>
        )}
        {!user && (
          <Flex flex={1} flexDirection={'column'} p={3}>
            <Tabbar flexProp={1} />
            <Flex
              flex={1}
              alignItems={"center"}
              justifyContent={"center"}
              fontFamily={"Montserrat"}
              color={"brand.textPrimary"}
            >
              <p>Access denied, Login to use the website</p>
            </Flex>
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default Dashboard;
