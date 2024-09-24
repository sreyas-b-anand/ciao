import {  Flex } from "@chakra-ui/react";
import Navbar from "../../components/Navbar/Navbar";
import RightSide from "./RightSide";

import { useEffect, useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";

const Dashboard = () => {
  const [display, setDisplay] = useState(true);
  const user = useAuthContext();
  useEffect(() => {
    //console.log("in dashboard ", user);
    if(user){
      setDisplay(true)
    }
    else{
      setDisplay(false)
    }
  }, [user]);
  return (
    <>
      <Flex
        flexWrap={"wrap"}
        gap={2}
        maxWidth={"100vw"}
        maxHeight={"100vh"}
        padding={0}
        backgroundColor={"brand.background"}
      >
        <Navbar />
        {display && (
          <>
            <RightSide />
          </>
        )}
        {!display && (
          <Flex
            width={"100vw"}
            alignItems={"center"}
            justifyContent={"center"}
            fontFamily={"Montserrat"}
            color={"brand.textPrimary"}
          >
            Access denied , Login to use the website
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default Dashboard;
