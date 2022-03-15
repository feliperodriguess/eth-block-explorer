import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./App";
import { EthereumProvider } from "./hooks/use-ethereum";
import { theme } from "./styles/theme";

ReactDOM.render(
  <React.StrictMode>
    <EthereumProvider>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </EthereumProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
