type EnhancedGenerateContentResponse ={
  children : string
}


import { Button, Container, Flex, FormControl, Input , Box , Text} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

import Navbar from "../components/Navbar/Navbar";
const Chat = () => {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  //const [loading, setLoading] = useState(false);
  const [paragraph, setParagraph] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [responseText, setResponseText] = useState<string | EnhancedGenerateContentResponse>("");
  const [data, setData] = useState<string[]>([]);
  useEffect(() => {
    if (value) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt =
      `You are a personal assistant chatbot. Help users with tasks such as setting reminders, providing weather updates, and answering general questions. Make sure to be concise and user-friendly.your question will be provided at the end of this prompt .question to respond is ${value}`;
    async function run() {
      const result = await model.generateContent(prompt);
      const response =  result.response;
      console.log(response)
      setResponseText(response.text());
      //setData((prevData:string[] ) => [...prevData, response]);
      console.log(responseText)
    }
  
    run()
  };
  }, [value]);

  const handleSubmit= ()=>{
    setValue(paragraph)
    setData((prevData:string[] ) => [...prevData, value]);
  }
  return (
    <>
      <Container
        maxWidth={"100vw"}
        maxHeight={"100vh"}
        padding={0}
        backgroundColor={"brand.background"}
        display={'flex'}
        flexDirection={'row'}
      >
        <Navbar />

        <Flex direction="column" flex="1" p={4}>
        {data.length > 0 ? (
          data.map((el, index) => (
            <Box key={index} p={2} mb={2} >
              <Text>{el}</Text>
            </Box>
          ))
        ) : (
          <Text>No messages yet</Text>
        )}
      </Flex>
        <Flex>
           <FormControl onSubmit={handleSubmit}>
           <Input value={paragraph} color={'brand.textPrimary'} onChange={(e)=> {
              setParagraph(e.target.value)
            }}/>
            <Button>Send</Button>
           </FormControl>
        </Flex>
      </Container>
    </>
  );
};

export default Chat;
