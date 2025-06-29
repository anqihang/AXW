export const apiConfig: { BASE_URL: string; SOCKET_URL: string; TIMEOUT: number } = { BASE_URL: {
    develop: "http://localhost:8080",
    trial: "https://.cn",
    release: "https://.com",
  }[globalData.accountInfo.miniProgram.envVersion || "develop"],
  SOCKET_URL: {
    develop: "ws://localhost:8080",
    trial: "wss://.cn",
    release: "wss://.com",
  }[globalData.accountInfo.miniProgram.envVersion || "develop"],
  // server请求超时时间（seconds）
  TIMEOUT: 20,
};
