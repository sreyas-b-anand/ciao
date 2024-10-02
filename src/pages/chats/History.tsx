import { lazy, useEffect, useRef } from "react";

import Navbar from "../../components/Navbar/Navbar";
import useFetch from "../../hooks/useFetch";
import Tabbar from "../../components/Navbar/Tabbar";
import { VStack, Text, Flex } from "@chakra-ui/react";

import Loading from "../../components/loader/Loading";
import { Suspense } from "react";
import useAuthContext from "../../hooks/useAuthContext";
const AllChatLoader = lazy(
  () => import("../../components/ChatComponents/ChatSection")
);
const History = () => {
  const { user } = useAuthContext();
  const { messages, error } = useFetch(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  // Fetch messages from Firestore

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <Flex
      maxWidth={"100vw"}
      maxHeight={"100vh"}
      padding={0}
      backgroundColor={"brand.background"}
    >
      <Navbar />
      <Flex direction={"column"} gap={1} flex={1} p={3}>
        <Tabbar flexProp={0.7} />

        {user ? (
          <Flex flex={1} flexDirection={"column"} p={3}>
            <Flex width={"100%"} alignItems={"center"} justify={"center"} p={3}>
              <Text
                borderBottom={"1px solid white"}
                fontFamily={"Montserrat"}
                fontWeight={700}
                color={"brand.textPrimary"}
                p={2}
              >
                Your History
              </Text>
            </Flex>
            <VStack
              spacing={4}
              alignItems={"stretch"}
              display={"flex"}
              flex={1}
              px={20}
            >
              <Suspense fallback={<Loading />}>
                <AllChatLoader messages={messages} error={error} />
              </Suspense>
            </VStack>
          </Flex>
        ) : (
          <Flex flex={1} alignItems={"center"} justifyContent={"center"}>
            <Text textAlign={"center"} color={"brand.textPrimary"}>
              Login to use
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default History;
