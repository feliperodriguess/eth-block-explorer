import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Box, Flex, Grid, Input, Spinner, Text } from "@chakra-ui/react";

import { TransactionCard } from "../../components";
import { useEthereum } from "../../hooks/use-ethereum";
import { useDebounce } from "../../hooks/use-debounce";
import { TransactionsType } from "../../utils/types";
import {
  DEBOUNCE_TIME,
  METAMASK_STATUS,
  scrollBarStyles,
} from "../../utils/constants";
import { getFilteredTransactions } from "../../utils/helpers";

const Transactions = () => {
  const { metaMaskStatus, hasProvider, provider } = useEthereum();
  const { blockNumber } = useParams();
  const [transactions, setTransactions] = useState([] as TransactionsType);
  const [isLoading, setIsLoading] = useState(true);
  const [searchedAddress, setSearchedAddress] = useState("");
  const debouncedSearchedAddress = useDebounce<string>(
    searchedAddress,
    DEBOUNCE_TIME
  );

  const getTransactions = async (search: string) => {
    setIsLoading(true);
    const transactions = await getFilteredTransactions(
      provider,
      +blockNumber!,
      search
    );
    setIsLoading(false);
    setTransactions(transactions);
  };

  useEffect(() => {
    if (hasProvider) {
      getTransactions(debouncedSearchedAddress);
    }
  }, [hasProvider, debouncedSearchedAddress]);

  if (!!metaMaskStatus && metaMaskStatus !== METAMASK_STATUS.CONNECTED) {
    return <Navigate to="/login" />;
  }

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="medium" mb={4} textAlign="center">
        Transactions of Block{" "}
        <Text as="span" color="pink.400">
          {Number(blockNumber).toLocaleString("us-EN")}
        </Text>
      </Text>
      {isLoading ? (
        <Flex align="center" mt={4}>
          <Spinner mx="auto" color="pink.500" />
        </Flex>
      ) : (
        <Box>
          <Flex align="center" justify="space-between" my={8}>
            <Input
              borderWidth="2px"
              colorScheme="pink"
              placeholder="Search transaction by address"
              onChange={(event) => setSearchedAddress(event.target.value)}
              maxW="300px"
              value={searchedAddress}
              _focus={{ borderColor: "pink.500" }}
            />
            <Text
              fontSize="xl"
              fontWeight="medium"
              textAlign="center"
            >{`${transactions.length} transactions`}</Text>
          </Flex>
          <Grid gap={4} maxH="500px" overflow="auto" css={scrollBarStyles}>
            {transactions.map((transaction) => (
              <TransactionCard
                key={transaction.hash}
                transaction={transaction}
              />
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default Transactions;
