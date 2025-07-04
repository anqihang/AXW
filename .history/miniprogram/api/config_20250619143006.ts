export const apiConfig: { baseUrl: { develop: string; trial: string; release: string }; timeout: number } = {
  baseUrl: {
    develop: "http://localhost:8080",
    trial: "https://.cn",
    release: "https://.com",
  },
  // server请求超时时间(s)
  timeout: 20,
};
