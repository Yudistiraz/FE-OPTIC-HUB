import { DefaultUser } from "next-auth";

interface Credential {
  id: string;
  shortId: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    id: string;
    shortId: string;
    name: string;
    email: string;
    role: string;
    token: string;
  }
}

declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: DefaultUser & {
      id: string;
      shortId: string;
      name: string;
      email: string;
      role: string;
      token: string;
    };
  }

  interface User extends DefaultUser {
    id: string;
    shortId: string;
    name: string;
    email: string;
    role: string;
    token: string;
  }
}
