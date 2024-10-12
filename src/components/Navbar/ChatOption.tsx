type LinkType = {
  title: string;
  href1: string;
  href2: string;
  cover1: string;
  cover2: string;
};

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
const AccordionLink = ({title , href1,  href2 , cover1 , cover2}: LinkType) => {
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
                {title}
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
              <Link to={href1}>{cover1}</Link>
              <Link to={href2}>{cover2} </Link>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default AccordionLink;
