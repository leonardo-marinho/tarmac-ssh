const hardhat = require('hardhat');

const CONTRACT_NAME = '';

async function main() {
  const [deployer] = await hardhat.ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);
  const transactionsContract = await hardhat.ethers.deployContract(CONTRACT_NAME);
  console.log('Contract address:', await transactionsContract.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
