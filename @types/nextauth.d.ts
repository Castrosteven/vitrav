import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    id_token?: string;  // Make id_token optional or required based on your needs
  }
}