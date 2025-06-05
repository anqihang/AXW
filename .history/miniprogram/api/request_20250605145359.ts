import { buf2hex, hex2Str } from "/utils/util";
import storage from "../utils/storage";
import { apiConfig } from "./config";

const { globalData } = getApp<IAppOption>();
const baseUrl = apiConfig.baseUrl[globalData.accountInfo.miniProgram.envVersion];

type BasicProps = {
  data?: WechatMiniprogram.RequestOption["data"];
  header?: WechatMiniprogram.RequestOption["header"];
};
type SSEEvent = {
  onMessage: (e: any) => void;
  onConnect: () => void;
  onClose: () => void;
  onError: (e: any) => void;
};
type RequestOptions = BasicProps & (({ enableChunked: true } & SSEEvent) | ({ enableChunked?: false } & Partial<SSEEvent>));
type SSEObj = { abort: () => void; task: WechatMiniprogram.RequestTask };
let reqList: any[] = [];
let isRefreshing = false;

export function Request(
  url: WechatMiniprogram.RequestOption["url"],
  method: WechatMiniprogram.RequestOption["method"],
  { data, header }: BasicProps
) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + url,
      method,
      header: {
        Authorization: storage.get("Authorization"),
        ...header,
      },
      timeout: 1000 * (apiConfig.timeout || 20),
      useHighPerformanceMode: globalData.deviceInfo.platform == "android" ? true : false, // 仅android
      data,
      success(res) {
        console.log(url + "请求成功", res);
        // 网络调试信息
        const profile = res.profile;
        const statusCode = res.statusCode;
        if (statusCode >= 200 && statusCode < 300) {
          resolve(res.data);
        } else if (statusCode >= 300 && statusCode < 400) {
          if (statusCode === 403) {
            if (isRefreshing) {
              new Promise((resolve, reject) => {
                reqList.push({
                  options: { url, method, data, header },
                  callback_resolve: (data: any) => resolve(data),
                  callback_reject: (error: any) => reject(error),
                });
              })
                .then((data) => {
                  resolve(data);
                })
                .catch((error) => {
                  reject(error);
                });
            } else {
              isRefreshing = true;
              refreshToken().then(() => {
                Request(url, method, { data, header }).then((data) => {
                  resolve(data);
                });
              });
            }
          }
        }
      },
      fail(error) {
        reject(error);
      },
      complete() {},
    });
  });
}
export function refreshToken() {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + "/refresh",
      method: "POST",
      header: {
        refreshAuthorization: storage.get("refreshAuthorization"),
      },
      success(res: any) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          storage.set("Authorization", res.data?.Authorization);
          isRefreshing = false;
          reqList.forEach(({ options, callback_resolve, callback_reject }) => {
            RequestSSE(options.url, options.method, options)
              .then((data) => {
                callback_resolve(data);
              })
              .catch((error) => callback_reject(error));
          });

          reqList = [];
          resolve(true);
        }
      },
      fail(error) {
        reject(error);
      },
      complete() {},
    });
  });
}
export function RequestSSE(
  url: WechatMiniprogram.RequestOption["url"],
  method: WechatMiniprogram.RequestOption["method"],
  options: RequestOptions & { enableChunked?: false }
): Promise<any>;
export function RequestSSE(
  url: WechatMiniprogram.RequestOption["url"],
  method: WechatMiniprogram.RequestOption["method"],
  options: RequestOptions & { enableChunked: true }
): Promise<SSEObj>;

export function RequestSSE(
  url: WechatMiniprogram.RequestOption["url"],
  method: WechatMiniprogram.RequestOption["method"],
  { data, header, enableChunked, onMessage, onConnect, onError, onClose }: RequestOptions = { enableChunked: false }
) {
  return new Promise((resolve, reject) => {
    let requestTask = wx.request({
      url: baseUrl + url,
      method,
      header: {
        Authorization: storage.get("Authorization"),
        ...header,
      },
      timeout: 1000 * (apiConfig.timeout || 20),
      useHighPerformanceMode: globalData.deviceInfo.platform == "android" ? true : false, // 仅android
      data,
      enableChunked,
      success(res) {
        console.log(url + "请求成功", res);
        // 网络调试信息
        const profile = res.profile;
        const statusCode = res.statusCode;
        if (statusCode >= 200 && statusCode < 300) {
          if (!enableChunked) {
            resolve(res.data);
          } else {
            let sse = {
              abort() {
                requestTask.abort();
                requestTask.offHeadersReceived();
                requestTask.offChunkReceived();
                onClose && onClose();
              },
              task: requestTask,
            };
            resolve(sse);
          }
        } else if (statusCode >= 300 && statusCode < 400) {
          if (statusCode === 403) {
            if (isRefreshing) {
              new Promise((resolve, reject) => {
                reqList.push({
                  options: { url, method, data, header, enableChunked, onMessage, onConnect, onError, onClose },
                  callback_resolve: (data: any) => resolve(data),
                  callback_reject: (error: any) => reject(error),
                });
              })
                .then((data) => {
                  resolve(data);
                })
                .catch((error) => {
                  reject(error);
                });
            } else {
              isRefreshing = true;
              refreshToken().then(() => {
                RequestSSE(url, method, {
                  data,
                  header,
                  ...(enableChunked ? { onMessage, onConnect, onError, onClose } : {}),
                }).then((data) => {
                  if (!enableChunked) {
                    resolve(data);
                  } else {
                    let sse = {
                      abort() {
                        requestTask.abort();
                        requestTask.offHeadersReceived();
                        requestTask.offChunkReceived();
                        onClose && onClose();
                      },
                      task: requestTask,
                    };
                    resolve(sse);
                  }
                });
              });
            }
          }
        }
      },
      fail(error) {
        reject(error);
        if (enableChunked) {
          onError && onError(error);
          onClose && onClose();
        }
      },
      complete() {
        if (enableChunked) {
          onClose && onClose();
        }
      },
    });
    if (enableChunked) {
      requestTask.onHeadersReceived((res) => {
        if (res.statusCode == 200) {
          onConnect && onConnect();
        } else {
          onError && onError(res);
        }
      });
      requestTask.onChunkReceived((res) => {
        const text = hex2Str(buf2hex(res.data));
        onMessage && onMessage(text);
      });
    }
  });
}
