import { Grid, Flex, Text } from "@chakra-ui/react";

import { convertWeiToEth, parseHash } from "../../utils/helpers";
import { TransactionResponse } from "../../utils/types";

import { styles } from "./styles";

interface TransactionCardProps {
  transaction: TransactionResponse;
}

const TransactionProperty = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => (
  <Flex align="center" justify="center" w="100%">
    <Text {...styles.text} color="white">
      {title}:
    </Text>
    <Text {...styles.text} fontWeight="normal" ml={[2, 4]}>
      {value}
    </Text>
  </Flex>
);

const TransactionCard = ({ transaction }: TransactionCardProps) => {
  const { from, gasPrice, hash, to, value } = transaction;

  console.log("transaction", transaction);

  return (
    <Grid {...styles.container}>
      <TransactionProperty title="Transaction Hash" value={parseHash(hash)} />
      <TransactionProperty title="From" value={parseHash(from)} />
      <TransactionProperty title="To" value={parseHash(to || "")} />
      <TransactionProperty
        title="Gas Price"
        value={`${convertWeiToEth(gasPrice!)} ETH`}
      />
      <TransactionProperty
        title="Value"
        value={`${convertWeiToEth(value)} ETH`}
      />
    </Grid>
  );
};

export default TransactionCard;
