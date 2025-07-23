import { IAppOption } from "typings";

const { globalData } = getApp<IAppOption>();

const URL = {
  develop: "localhost:8080",
  trial: "1",
  release: "2",
} as const;
const TARGET_URL = URL[globalData.accountInfo.miniProgram.envVersion || "develop"];

export const apiConfig= {
  BASE_URL: "https://" + TARGET_URL,
  // server请求超时时间（seconds）
  TIMEOUT: 20,
  SOCKET_URL: "wss://" + TARGET_URL,
} as const;
