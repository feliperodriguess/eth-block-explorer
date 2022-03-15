import {
  Box,
  Container,
  Flex,
  IconButton,
  Spinner,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { RepeatIcon } from "@chakra-ui/icons";

import { BlockCard } from "../../components";
import { useEthereum } from "../../hooks/use-ethereum";
import { getNLatestEthereumBlocks } from "../../utils/helpers";
import { Block } from "../../utils/types";
import { METAMASK_STATUS, scrollBarStyles } from "../../utils/constants";

const Home = () => {
  const { address, hasProvider, metaMaskStatus, provider } = useEthereum();
  const [latestBlocks, setLatestBlocks] = useState([] as Block[]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshBlocks = async () => {
    setIsLoading(true);
    const blocks = await getNLatestEthereumBlocks(provider, 10);
    setIsLoading(false);
    setLatestBlocks(blocks);
  };

  useEffect(() => {
    if (hasProvider) {
      refreshBlocks();
    }
  }, [hasProvider]);

  if (!!metaMaskStatus && metaMaskStatus !== METAMASK_STATUS.CONNECTED) {
    return <Navigate to="/login" />;
  }

  return (
    <Box>
      <Text fontWeight="medium" fontSize="lg">
        Connected Wallet:{" "}
        <Text as="span" color="pink.500">
          {address}
        </Text>
      </Text>

      {isLoading ? (
        <Flex align="center" mt={8}>
          <Spinner mx="auto" color="pink.500" />
        </Flex>
      ) : (
        <Container
          maxHeight="500px"
          mt={8}
          overflow="auto"
          css={scrollBarStyles}
        >
          <Flex align="center" gap={4} justify="center">
            <Text fontSize="2xl" fontWeight="bold">
              Blocks
            </Text>
            <Tooltip label="Refresh the 10 latest blocks">
              <IconButton
                aria-label="Refresh blocks"
                colorScheme="pink"
                icon={<RepeatIcon />}
                onClick={refreshBlocks}
                size="sm"
              />
            </Tooltip>
          </Flex>
          {latestBlocks.map((block) => (
            <BlockCard key={block.number} block={block} />
          ))}
        </Container>
      )}
    </Box>
  );
};

export default Home;
