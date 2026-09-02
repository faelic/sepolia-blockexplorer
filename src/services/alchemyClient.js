import { Alchemy } from 'alchemy-sdk';

const apiKey = process.env.REACT_APP_ALCHEMY_API_KEY;

const settings = {
  apiKey,
  url: apiKey ? `https://eth-sepolia.g.alchemy.com/v2/${apiKey}` : undefined,
};

const alchemy = new Alchemy(settings);

export default alchemy;
