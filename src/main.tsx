import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "./theme/theme";
import AuthContextProvider from "./context/AuthContext";
import TaskContextProvider from "./context/TaskContext";
createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={customTheme}>
    <TaskContextProvider>
    <AuthContextProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </AuthContextProvider>
    </TaskContextProvider>
  </ChakraProvider>
);
