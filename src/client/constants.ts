export enum QueryKeys {
  SignIn = 'SignIn',
  SignUp = 'SignUp',
  User = 'user',
}

export enum Paths {
  Dashboard = '/dashboard',
  Home = '/',
  SignUp = '/signup',
}

export const publicPaths: string[] = [Paths.Home, Paths.SignUp];
