import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Grid,
  IconButton,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

import { TransactionCard } from "../../components";
import { useEthereum } from "../../hooks/use-ethereum";
import { useDebounce } from "../../hooks/use-debounce";
import { TransactionsType } from "../../utils/types";
import { DEBOUNCE_TIME, METAMASK_STATUS } from "../../utils/constants";
import { getFilteredTransactions } from "../../utils/helpers";

import { styles } from "./styles";

const Transactions = () => {
  const { metaMaskStatus, hasProvider, provider } = useEthereum();
  const { blockNumber } = useParams();
  const navigate = useNavigate();
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
      <Flex align="center" gap={6} justify="center">
        <IconButton
          icon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          {...styles.iconButton}
        />
        <Text textAlign="center" {...styles.title}>
          Transactions of Block{" "}
          <Text as="span" display={["block", "inline"]} color="pink.400">
            {Number(blockNumber).toLocaleString("us-EN")}
          </Text>
        </Text>
      </Flex>

      {isLoading ? (
        <Flex align="center" mt={4}>
          <Spinner mx="auto" color="pink.500" />
        </Flex>
      ) : (
        <Box>
          <Flex flexDir={["column", "row"]} {...styles.header}>
            <Input
              placeholder="Search transactions by wallet"
              onChange={(event) => setSearchedAddress(event.target.value)}
              value={searchedAddress}
              {...styles.input}
            />
            <Text textAlign="center" {...styles.transactionsCount}>{`${
              transactions.length
            } transaction${transactions.length === 1 ? "" : "s"}`}</Text>
          </Flex>
          <Grid {...styles.transactionsContainer}>
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
