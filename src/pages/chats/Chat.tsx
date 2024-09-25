import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState, useEffect, useRef } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  Flex,
  Image,
} from "@chakra-ui/react";
import { db } from "../../firebase/firebase"; // Adjust the path as needed
import { collection, addDoc } from "firebase/firestore";
import Navbar from "../../components/Navbar/Navbar";
import Tabbar from "../../components/Navbar/Tabbar";
import useFetch from "../../hooks/useFetch";
import aiLogo from "../../assets/ailogo/ch.jpeg";
import { CgProfile } from "react-icons/cg";
import useAuthContext from "../../hooks/useAuthContext";

const ChatInterface = () => {
  const { user } = useAuthContext();
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const [value, setValue] = useState<string | null>("hello");
  const [previousText, setPrevioustext] = useState<string | null>("");
  const [responseText, setResponsetext] = useState<string | null>("");
  useEffect(() => {
    setPrevioustext(value);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `You are a personal assistant chatbot. Make sure to be concise and user-friendly. Help users with tasks such as setting reminders, providing weather updates, and answering general questions.Generate multiple response if needed.Conversation will be sequential so remember the previous prompt and response.previuos input was ${previousText} previuos response was ${responseText}.Check whether the new prompt and previous prompt have any relation.If yes generate content apporpriately.your question will be provided at the end of this prompt .question to respond is ${value}`;
    async function run() {
      try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = await response.text();
        setResponsetext(text);
        await addDoc(collection(db, "messages"), {
          text: text,
          sender: `${user?.email}assistant`,
          timestamp: new Date(),
        });
      } catch (error) {
        console.log(error);      ///////////////////
      }
    }
    run();
  }, [value]);

  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const [input, setInput] = useState("");

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  // Fetch messages from Firestore
  const { messages, error } = useFetch(true);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    try {
      if (input.trim()) {
        // Save user's message
        await addDoc(collection(db, "messages"), {
          text: input,
          sender: user?.email, //user
          timestamp: new Date(),
        });
        setValue(input);
        setInput("");
      }
    } catch (error) {
      console.log(error);      ////////////////////////////
    }
  };

  return (
    <Flex
      maxWidth={"100vw"}
      minHeight={"100vh"}
      background={"brand.background"}
      direction={"row"}
    >
      <Navbar />

      <Flex direction={"column"} gap={1} flex={1} p={3}>
        <Tabbar flexProp={1} />
        {user ? (
          <Flex flexDirection={"column"} p={3} flex={1}>
            <Flex
              maxWidth={"100%"}
              alignItems={"center"}
              justify={"center"}
              p={3}
            >
              <Text
                borderBottom={"1px solid white"}
                fontFamily={"Montserrat"}
                fontWeight={700}
                color={"brand.textPrimary"}
                p={2}
              >
                Chat with CIAO
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
                        msg.sender == `${user?.email}assistant` ? "flex-start" : "flex-end"
                      }
                      justifyContent={
                        msg.sender == `${user?.email}assistant` ? "flex-start" : "flex-end"
                      }
                    >
                      <Flex
                        gap={2}
                        flexDirection={
                          msg.sender == `${user?.email}assistant` ? "row" : "row-reverse"
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
                  <p className="w-[full] z-30 flex items-center justify-center p-1 text-white">
                    {error}
                  </p>
                )}
              </Flex>
              <Flex direction={"row"}>
                <Input
                  color={"white"}
                  flex={1}
                  width={"100%"}
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                />
                <Button
                  onClick={handleSend}
                  backgroundColor={"brand.accent"}
                  color={"textPrimary"}
                >
                  Send
                </Button>
              </Flex>
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

export default ChatInterface;
