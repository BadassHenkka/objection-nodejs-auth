type UserDataType = {
  id: number;
  username: string;
  email?: string | null;
};

declare namespace Express {
  interface Request {
    token: { data: UserDataType };
    currentUser: UserDataType;
  }
}
