import { Alchemy } from 'alchemy-sdk';

const rpcUrl = process.env.REACT_APP_ALCHEMY_RPC_URL || '/api/sepolia-rpc';

const settings = {
  url: rpcUrl,
};

const alchemy = new Alchemy(settings);

export default alchemy;
