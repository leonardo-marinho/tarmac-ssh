Project for Tarmac's Spring September Hackaton using NextJS and Solidity

## Getting Started

### Requirements

- Node 18.x or NVM installed
- Postgres (latest) running
- Setup .env file

### Running in dev mode

```bash
# First install all dependencies
npm install

# Migrate your postgres database
npm run db:migrate

# Start project in dev mode
npm run dev
```

### Deploying contracts

1. Fill .env with Infura API URL and private key (create an account [here](https://www.infura.io/))
2. Create your contract inside contracts folder
3. Run deploy script

```bash
# Replace MyContract with your contract name
CONTRACT_NAME=MyContract npm run hardhat:deploy
```

### Application links

- UI will be running on http://localhost:3000
- API will be running on http://localhost:3000/api

## Useful links

- [Next.js Documentation](https://nextjs.org/docs)
- [Hardhat (Solidity)](https://www.pointer.gg/tutorials/solid-solidity/de5cf2d9-86c3-4de7-9260-ed59491abfa1)
- [Prisma reference](https://www.prisma.io/docs/reference)
- [Understanding Blockchain](https://andersbrownworth.com/blockchain/blockchain)
