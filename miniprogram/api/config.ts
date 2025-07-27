import { IAppOption } from "typings";
import { URL } from "./url";

const { globalData } = getApp<IAppOption>();

const TARGET_URL = URL[globalData?.accountInfo?.miniProgram?.envVersion || "develop"];

export const apiConfig = {
  BASE_URL: "http://" + TARGET_URL,
  // server请求超时时间（seconds）
  TIMEOUT: 20,
  SOCKET_URL: "wss://" + TARGET_URL,
} as const;
export { URL };

