require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    sepolia: {
      accounts: [process.env.SEPOLIA_PRIVATE_KEY],
      url: process.env.SEPOLIA_API_URL,
    },
  },
  paths: {
    artifacts: './artifacts',
    cache: './cache',
    sources: './contracts',
  },
  solidity: '0.8.17',
};
