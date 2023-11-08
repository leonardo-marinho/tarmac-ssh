import { EnvConfig } from './interfaces';

const envConfig: EnvConfig = {
  blockchain: {
    apiUrl: process.env.BLOCKCHAIN_API_URL,
    privateKey: process.env.BLOCKCHAIN_PRIVATE_KEY,
  },
};

export default envConfig;
