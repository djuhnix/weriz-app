export type AuthModel = {
  tokenData: {
    token: string;
    expiresIn: number;
  };
  isAuthenticated?: boolean;
}