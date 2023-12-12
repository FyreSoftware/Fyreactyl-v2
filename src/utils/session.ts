// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type { User } from "@prisma/client";
import type { SessionOptions } from "iron-session";

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_PASSWORD!,
  cookieName: "fyreactyl-token",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export interface IronSessionObject {
  user?: User;
}

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}
