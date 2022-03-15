import { useEffect } from "react";
import {
  Grid,
  Flex,
  Text,
  IconButton,
  Tooltip,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";

import { convertWeiToEth, parseHash } from "../../utils/helpers";
import { TransactionResponse } from "../../utils/types";

import { styles } from "./styles";

interface TransactionCardProps {
  transaction: TransactionResponse;
}

const TransactionProperty = ({
  title,
  value,
  copiedValueToClipboard = "",
}: {
  title: string;
  value: string | number;
  copiedValueToClipboard?: string;
}) => {
  const toast = useToast();
  const { hasCopied, onCopy } = useClipboard(String(copiedValueToClipboard));

  useEffect(() => {
    if (hasCopied) {
      toast({
        title: "Address copied to clipboard!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [hasCopied, toast]);

  return (
    <Flex align="center" gap={[2, 4]} justify="center" w="100%">
      <Text {...styles.text} color="white">
        {title}:
      </Text>
      <Text {...styles.text} fontWeight="normal">
        {value}
      </Text>
      {!!copiedValueToClipboard && (
        <Tooltip label="Copy address to clipboard">
          <IconButton
            aria-label="Copy to clipboard"
            colorScheme="transparent"
            icon={<CopyIcon />}
            onClick={onCopy}
          />
        </Tooltip>
      )}
    </Flex>
  );
};

const TransactionCard = ({ transaction }: TransactionCardProps) => {
  const { from, gasPrice, hash, to, value } = transaction;

  return (
    <Grid {...styles.container}>
      <TransactionProperty
        copiedValueToClipboard={hash}
        title="Transaction Hash"
        value={parseHash(hash)}
      />
      <TransactionProperty
        copiedValueToClipboard={from}
        title="From"
        value={parseHash(from)}
      />
      <TransactionProperty
        copiedValueToClipboard={to}
        title="To"
        value={parseHash(to || "")}
      />
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
