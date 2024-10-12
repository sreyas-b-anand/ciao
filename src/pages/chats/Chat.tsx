import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState, useEffect, useRef } from "react";
import {
  Input,
  Button,
  VStack,
  Text,
  Flex,
  Image,
  Box,
  Spinner
} from "@chakra-ui/react";
import { db } from "../../firebase/firebase"; // Adjust the path as needed
import { collection, addDoc } from "firebase/firestore";

import useFetch from "../../hooks/useFetch";
import aiLogo from "../../assets/ailogo/ch.jpeg";
import { CgProfile } from "react-icons/cg";
import useAuthContext from "../../hooks/useAuthContext";

import { MdSend } from "react-icons/md";
import Navbar from "../../components/Navbar/Navbar";
const ChatInterface = () => {
  const [loading, setLoading] = useState(false);
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const { user } = useAuthContext();
  const [value, setValue] = useState<string | null>("hello");
  const [previousText, setPrevioustext] = useState<string | null>("");
  const [responseText, setResponsetext] = useState<string | null>("");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  useEffect(() => {
    setPrevioustext(value);
    const prompt = `You are a personal ai assistant chatbot. Make sure to be concise and user-friendly. Help users with tasks such as setting reminders, providing weather updates, and answering general questions.Only generate a maximum of two responses at a time.Conversation will be sequential so remember the previous prompt and response.previuos input was ${previousText} previuos response was ${responseText}.Check whether the new prompt and previous prompt have any relation.If yes generate content apporpriately.your question will be provided at the end of this prompt .question to respond is ${value}`;
    async function run() {
      try {
        setLoading(true)
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
        console.log(error); ///////////////////
      }
      finally{
        setLoading(false)
      }
    }
    run();
  }, [value, user?.email]);

  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);

  const [input, setInput] = useState("");

  // Fetch messages from Firestore
  const { messages, error } = useFetch(true);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
      console.log(error); ////////////////////////////
    }
  };

  return (
    <Flex maxWidth="100vw" minHeight="100vh" background="brand.background" >
      <Navbar />
    <Flex direction="column" gap={2} flex={1} p={3}>
      <VStack spacing={4} align="stretch" flex={1} px={6}>
        {/* Chat Header */}
        <Flex justify="center" p={4} borderBottom="1px solid white">
          <Text fontWeight="bold" color="brand.textPrimary" fontSize="xl">
            Chat with CIAO
          </Text>
        </Flex>

        {/* Messages Area */}
        <Flex direction="column" flex={1} overflowY="auto" maxH="70vh" p={4} bg="brand.bg" borderRadius="md">
          {messages &&
            messages.map((msg) => (
              <Flex
                key={msg.id}
                align={msg.sender === `${user?.email}assistant` ? "flex-start" : "flex-end"}
                justify={msg.sender === `${user?.email}assistant` ? "flex-start" : "flex-end"}
                p={2}
              >
                <Flex direction={msg.sender === `${user?.email}assistant` ? "row" : "row-reverse"} gap={2}>
                  {msg.sender === `${user?.email}assistant` ? (
                    <Image width="30px" height="30px" borderRadius="50%" src={aiLogo} alt="AI" />
                  ) : (
                    <CgProfile size="30px" color="white" />
                  )}
                  <Box
                    bg={msg.sender === `${user?.email}assistant` ? "green.300" : "blue.500"}
                    color="white"
                    borderRadius="lg"
                    p={3}
                    maxWidth="75%"
                  >
                    {msg.text}
                  </Box>
                </Flex>
              </Flex>
            ))}
          <div ref={chatEndRef} />
          {!messages && <Text color="brand.textPrimary">No messages to show</Text>}
          {error && <Text color="red.500">An error occurred.</Text>}
        </Flex>

        {/* Input and Send Button */}
        <Flex gap={2} align="center">
          <Input
            flex={1}
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            bg="brand.background"
            color="brand.textPrimary"
          />
          <Button
            onClick={handleSend}
            isLoading={loading}
            bg="brand.accent"
            _hover={{ bg: "brand.accentDark" }}
          >
            {loading ? <Spinner size="sm" /> : <MdSend />}
          </Button>
        </Flex>
      </VStack>
    </Flex>
  </Flex>
  );
};

export default ChatInterface;
