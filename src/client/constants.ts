export enum QueryKeys {
  Refill = 'refill',
  SignIn = 'SignIn',
  SignUp = 'SignUp',
  User = 'user',
  UserAmount = 'userAmount',
}

export enum Paths {
  Dashboard = '/dashboard',
  Leaderboard = '/leaderboard',
  MyTransactions = '/my-transactions',
}

export const publicPaths: string[] = [Paths.Dashboard];

export const coinNumbers = [
  56, 77, 14, 53, 8, 89, 30, 65, 42, 11, 68, 39, 24, 73, 86, 27, 78, 51, 16, 97, 4, 59, 32, 81,
];

export const MONEY_SYMBOL = 'K$';

export const REFETCH_INTERVAL = 5000;
