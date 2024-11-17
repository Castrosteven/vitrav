import { auth } from "./auth";
import axios, { AxiosInstance } from "axios";

export const authenticatedClient = async (): Promise<AxiosInstance | null> => {
  const session = await auth();
  if (session === null || session.id_token === undefined) {
    return null;
  }
  const token = session.id_token;
  // console.log(token)
  const instance = axios.create({
    baseURL: "https://qw5p2pn2if.execute-api.us-east-1.amazonaws.com/Stage",
    headers: {
      Authorization: token,
    },
  });
  return instance;
};
