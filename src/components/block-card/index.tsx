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
    <Container flexDirection="column" {...styles.container}>
      <BlockProperty
        title="Number"
        value={Number(block.number).toLocaleString("us-EN")}
      />
      <BlockProperty title="Date" value={formatTimestamp(block.timestamp)} />
      <BlockProperty title="Hash" value={parseHash(block.hash)} />
      <BlockProperty title="Miner" value={parseHash(block.miner)} />
      <Button
        onClick={() => navigate(`/blocks/${block.number}/transactions`)}
        {...styles.button}
      >
        View Transactions
      </Button>
    </Container>
  );
};

export default BlockCard;
