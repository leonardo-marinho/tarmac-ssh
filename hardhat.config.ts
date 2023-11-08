require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    sepolia: {
      accounts: [process.env.INFURA_PRIVATE_KEY],
      url: process.env.INFURA_API_URL,
    },
  },
  paths: {
    artifacts: '.hardhat/artifacts',
    cache: '.hardhat/cache',
    sources: 'src/lib/ethers/contracts',
  },
  solidity: '0.8.17',
  typechain: {
    outDir: 'src/lib/ethers/contracts/generated',
  },
};
