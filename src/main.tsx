import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "./theme/theme";
import AuthContextProvider  from "./context/AuthContext";
createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={customTheme}>
    <AuthContextProvider>
    <StrictMode>
      <App />
    </StrictMode>
    </AuthContextProvider>
  </ChakraProvider>
);
