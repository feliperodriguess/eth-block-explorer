import { Button, Container, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { formatTimestamp, parseHash } from "../../utils/helpers";

import { Block } from "../../utils/types";
import { styles } from "./styles";

interface BlockCardProps {
  block: Block;
}

const BlockProperty = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => {
  return (
    <Flex align="center" justify="center" mt={2} w="100%">
      <Text {...styles.text} color="white">
        {title}:
      </Text>
      <Text {...styles.text} ml={4} isTruncated>
        {value}
      </Text>
    </Flex>
  );
};

const BlockCard = ({ block }: BlockCardProps) => {
  const navigate = useNavigate();

  return (
    <Container {...styles.container}>
      <BlockProperty
        title="Number"
        value={Number(block.number).toLocaleString("us-EN")}
      />
      <BlockProperty title="Date" value={formatTimestamp(block.timestamp)} />
      <BlockProperty title="Hash" value={parseHash(block.hash)} />
      <BlockProperty title="Miner" value={parseHash(block.miner)} />
      <BlockProperty title="Nonce" value={parseHash(block.nonce)} />
      <Button
        colorScheme="pink"
        isFullWidth
        mt={4}
        mb={2}
        onClick={() => navigate(`/blocks/${block.number}/transactions`)}
      >
        View Transactions
      </Button>
    </Container>
  );
};

export default BlockCard;
