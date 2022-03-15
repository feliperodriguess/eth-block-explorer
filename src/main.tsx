import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./App";
import { EthereumProvider } from "./hooks/use-ethereum";
import { EthereumRequestArguments } from "./utils/types";
import { theme } from "./styles/theme";

declare global {
  interface Window {
    ethereum: {
      on: (method: string, callback?: (arg: any) => void) => Promise<any>;
      request: (args: EthereumRequestArguments) => Promise<any>;
      removeListener: (
        method: string,
        callback?: (arg: any) => void
      ) => Promise<any>;
      selectedAddress: string;
    };
  }
}

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
