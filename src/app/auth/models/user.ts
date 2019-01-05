export interface Authenticate {
  username: string;
  password: string;
}

export interface User {
  access_token: string;
  refresh_token: string;
}
