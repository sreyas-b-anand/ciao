import {  useEffect, useRef } from "react";

import Navbar from "../components/Navbar/Navbar";
import useFetch from "../hooks/useFetch";
import Tabbar from "../components/Navbar/Tabbar";
import { Box, VStack, Text, Flex , Image} from "@chakra-ui/react";
import aiLogo from "../assets/ailogo/ch.jpeg";
import { CgProfile } from "react-icons/cg";


const History = () => {
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
        <Tabbar />
        
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
              <Flex
                maxHeight={"540px"}
                borderWidth="1px"
                borderRadius="lg"
                padding="4"
                overflow={"auto"}
                direction={"column"}
                flex={1}
              >
                {messages &&
                  messages.map((msg) => (
                    <Flex
                    key={msg.id}
                    alignItems={msg.sender=='assistant'?'flex-start':"flex-end"}
                    justifyContent={msg.sender=='assistant'?'flex-start':"flex-end"}
                  >
                    <Flex gap={2} flexDirection={msg.sender == "assistant"?'row' : "row-reverse"} >
                      {msg.sender == "assistant" ? (
                        <Image
                          width={"30px"}
                          height={"30px"}
                          borderRadius={'50%'}
                          src={aiLogo}
                          alt="ai"
                        />
                      ) : (
                        <CgProfile color="white" size={"30px"} />
                      )}
                      <Box
                        display="inline-block"
                        bg={msg.sender === "assistant" ?  "green.300" : "blue.500"}
                        color="white"
                        borderRadius="md"
                        padding="2"
                        marginBottom="2"
                      >
                        {msg.text}
                      </Box>
                    </Flex>
                  </Flex>
                  ))}
                <div ref={chatEndRef}></div>
                {!messages && (
                  <p className="w-[full] flex items-center justify-center p-1 text-white">
                    No messages to show
                  </p>
                )}
                {error && (
                  <p className="w-[full] flex items-center justify-center p-1 text-white">
                    {error}
                  </p>
                )}
              </Flex>
            </VStack>
          </Flex>
        
      </Flex>
    </Flex>
  );
};

export default History;
