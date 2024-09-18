import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "./theme/theme";
createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={customTheme}>
    <StrictMode>
      <App />
    </StrictMode>
  </ChakraProvider>
);
