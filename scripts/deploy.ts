// eslint-disable-next-line @typescript-eslint/no-var-requires
const hardhat = require('hardhat');

async function main() {
  const contractName = process.env.CONTRACT_NAME;

  if (!contractName) {
    console.error('Please specify the contract name as an argument.');
    return;
  }

  const [deployer] = await hardhat.ethers.getSigners();
  console.log(`Deploying contract ${contractName} with the account ${deployer.address}`);
  const transactionsContract = await hardhat.ethers.deployContract(contractName);
  console.log('Contract address:', await transactionsContract.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
