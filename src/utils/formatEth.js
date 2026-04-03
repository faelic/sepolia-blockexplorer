import { Utils } from 'alchemy-sdk';

function formatEth(value) {
  if (!value) {
    return '0 ETH';
  }

  const ethValue = Utils.formatEther(value);
  const roundedValue = Number(ethValue).toFixed(4);

  return `${roundedValue} ETH`;
}

export default formatEth;
