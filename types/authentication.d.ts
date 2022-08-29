export type User = {
  id: number;
  username: string;
};
export type Authentication = {
  authentication: {
    isLoggedIn?: boolean | unknown;
    user?: User | unknown;
  };
};
