type messageType = {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
};
type MessagePropType = {
  messages: messageType[];
  error: string | null | Error;
};
import React, { useRef, useEffect } from "react";
import { Flex, Image, Box } from "@chakra-ui/react";
import aiLogo from "../../assets/ailogo/ch.jpeg";
import { CgProfile } from "react-icons/cg";
import useAuthContext from "../../hooks/useAuthContext";
const ChatSection: React.FC<MessagePropType> = ({ messages, error }) => {
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const { user } = useAuthContext();
  return (
    <>
      <Flex
        maxHeight={"500px"}
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
              alignItems={
                msg.sender == `${user?.email}assistant`
                  ? "flex-start"
                  : "flex-end"
              }
              justifyContent={
                msg.sender == `${user?.email}assistant`
                  ? "flex-start"
                  : "flex-end"
              }
            >
              <Flex
                gap={2}
                flexDirection={
                  msg.sender == `${user?.email}assistant`
                    ? "row"
                    : "row-reverse"
                }
              >
                {msg.sender == `${user?.email}assistant` ? (
                  <Image
                    width={"30px"}
                    height={"30px"}
                    borderRadius={"50%"}
                    src={aiLogo}
                    alt="ai"
                  />
                ) : (
                  <CgProfile color="white" size={"30px"} />
                )}
                <Box
                  display="inline-block"
                  bg={
                    msg.sender === `${user?.email}assistant`
                      ? "green.300"
                      : "blue.500"
                  }
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
          <p className="w-[full] z-30 flex items-center text-center justify-center p-1 text-white">
            An error occured
          </p>
        )}
      </Flex>
    </>
  );
};

export default ChatSection;
