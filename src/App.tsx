import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Flex, Text } from "@chakra-ui/react";

import { Home, Login, Transactions } from "./pages";

const App = () => {
  return (
    <Flex align="center" flexDir="column" justify="center" h="100vh" w="100vw">
      <Text fontSize="3xl" fontWeight="semibold" mb={10}>
        Ethereum Block Explorer
      </Text>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/blocks/:blockNumber/transactions"
            element={<Transactions />}
          />
        </Routes>
      </BrowserRouter>
    </Flex>
  );
};

export default App;
