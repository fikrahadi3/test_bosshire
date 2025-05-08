export type User = {
  id: number;
  name: {
    firstname: string;
    lastname: string;
  };
  username: string;
};

export type LoginReq = {
  username: string;
  password: string;
};

export type GetUserByIDReq = {
  id: number;
};
