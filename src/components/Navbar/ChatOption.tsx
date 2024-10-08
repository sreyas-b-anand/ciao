import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  Box,
  AccordionPanel,
  AccordionItem,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
const ChatOption = () => {
  return (
    <>
      <Accordion allowToggle textAlign={"left"}>
        <AccordionItem
          border={"none"}
          display={"flex"}
          flexDirection={"column"}
          pl={0}
          textAlign={"left"}
        >
          <h2>
            <AccordionButton pl={0}>
              <Box as="span" flex="1" textAlign="left">
                Chat
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <Flex
              alignItems={"flex-start"}
              justifyContent={"start"}
              flexDirection={"column"}
              gap={3}
            >
              <Link to={"/chat"}>Chat with CIAO</Link>
              <Link to={"/history"}>Your History </Link>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default ChatOption;
