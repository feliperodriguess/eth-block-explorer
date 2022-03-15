import { Button } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";

import { ReactComponent as MetaMaskIcon } from "../../assets/metamask.svg";
import { useEthereum } from "../../hooks/use-ethereum";
import { METAMASK_STATUS } from "../../utils/constants";

const Login = () => {
  const { address, connect, metaMaskStatus } = useEthereum();
  const isWalletInstalled = metaMaskStatus !== METAMASK_STATUS.NOT_INSTALLED;

  if (!!address) {
    return <Navigate to="/" />;
  }

  return (
    <Button
      colorScheme="pink"
      leftIcon={<MetaMaskIcon />}
      onClick={
        isWalletInstalled
          ? connect
          : () => window.open("https://metamask.io/", "_blank")
      }
    >
      {!!metaMaskStatus && isWalletInstalled
        ? "Connect Wallet"
        : "Install MetaMask"}
    </Button>
  );
};

export default Login;
