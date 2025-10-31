import axios from "axios";
import { AxiosResponse } from "axios";
import dotenv from "dotenv";
dotenv.config({ path: ".env", quiet: true });

const Proxy_URL = process.env.PROXY_URL || "https://esapp-invoice-manager-k4p3y86ka-aaraya-dev-projects.vercel.app";

export const ProxyThenResponse = (res: AxiosResponse<any, any>): any => {
  if (!res.data || res.data === null || res.data === undefined) {
    return {
      status: res.status,
      message: "",
      data: null,
    };
  }

  const { status, message, ...data } = res.data;

  return {
    status: status ? status : res.status,
    message: message ? message : "",
    data: data ? data : null,
  };
};

export const ProxyCatchResponse = (error: any) => {
  return {
    status: error.response ? error.response.status : 500,
    error: error.message,
    ...error.response?.data,
  };
};

export const ProxyPublicRequest = axios.create({
  baseURL: Proxy_URL,
  headers: {
    "Content-Type": "application/json"
  },
});