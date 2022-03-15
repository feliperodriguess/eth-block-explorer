import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ethers } from "ethers";
import { METAMASK_STATUS } from "../utils/constants";
import { EthereumProviderProps } from "../utils/types";

const INITIAL_CONTEXT_VALUES = {
  metaMaskStatus: "",
  address: "",
  hasProvider: false,
  provider: {} as ethers.providers.Web3Provider,
  connect: () => {},
};

const EthereumContext = createContext(INITIAL_CONTEXT_VALUES);

const EthereumProvider = ({ children }: EthereumProviderProps) => {
  const [metaMaskStatus, setMetaMaskStatus] = useState("");
  const [address, setAddress] = useState("");
  const [provider, setProvider] = useState({} as ethers.providers.Web3Provider);

  const connect = useCallback(async () => {
    const accountList = await window?.ethereum?.request({
      method: "eth_requestAccounts",
    });
    const hasSomeAccountConnected = accountList?.length > 0;

    if (hasSomeAccountConnected) {
      setAddress(accountList[0]);
      setMetaMaskStatus(METAMASK_STATUS.CONNECTED);
      const web3Provider = new ethers.providers.Web3Provider(window?.ethereum);
      setProvider(web3Provider);
      return;
    }

    setMetaMaskStatus(METAMASK_STATUS.DISCONNECTED);
  }, []);

  const handleAccountsChanged = async (accounts: string[]): Promise<void> => {
    const hasSomeAccountConnected = accounts?.length > 0;
    if (!hasSomeAccountConnected) {
      setAddress("");
      setMetaMaskStatus(METAMASK_STATUS.DISCONNECTED);
      setProvider({} as ethers.providers.Web3Provider);
      return;
    }
    setAddress(accounts[0]);
    const web3Provider = new ethers.providers.Web3Provider(window?.ethereum);
    setProvider(web3Provider);
  };

  useEffect(() => {
    (async () => {
      const isMetamaskInstalled = typeof window.ethereum !== "undefined";
      const accountList = await window?.ethereum?.request({
        method: "eth_accounts",
      });
      const selectedAddress = accountList?.length > 0 ? accountList[0] : "";

      if (isMetamaskInstalled) {
        if (selectedAddress) {
          setAddress(selectedAddress);
          setMetaMaskStatus(METAMASK_STATUS.CONNECTED);
          const web3Provider = new ethers.providers.Web3Provider(
            window?.ethereum
          );
          setProvider(web3Provider);
          return;
        }
        setMetaMaskStatus(METAMASK_STATUS.INSTALLED);
        return;
      }

      setMetaMaskStatus(METAMASK_STATUS.NOT_INSTALLED);
    })();
  }, []);

  useEffect(() => {
    window?.ethereum?.on("accountsChanged", handleAccountsChanged);
    return () => {
      window?.ethereum?.removeListener(
        "accountsChanged",
        handleAccountsChanged
      );
    };
  }, []);

  const value = useMemo(
    () => ({
      address,
      connect,
      metaMaskStatus,
      provider,
      hasProvider: !!Object.keys(provider).length,
    }),
    [address, connect, metaMaskStatus, provider]
  );

  return (
    <EthereumContext.Provider value={value}>
      {children}
    </EthereumContext.Provider>
  );
};

const useEthereum = () => {
  const context = useContext(EthereumContext);
  return context;
};

export { EthereumProvider, useEthereum };
