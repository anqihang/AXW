import storage from "../utils/storage";
import { apiConfig } from "./config";
import { buf2hex, hex2Str } from "/utils/util";
type BasicProps = {
  data?: WechatMiniprogram.RequestOption["data"];
  header?: WechatMiniprogram.RequestOption["header"];
  enableChunked?: boolean;
};
type SSEEvent = {
  onMessage: (e: any) => void;
  onConnect: () => void;
  onClose: () => void;
  onError: (e: any) => void;
};
type RequestOptions = (BasicProps & ({ enableChunked: true } & SSEEvent)) | (BasicProps & { enableChunked?: false } & Partial<SSEEvent>);

const { globalData } = getApp<IAppOption>();
const baseUrl = apiConfig.baseUrl[globalData.accountInfo.miniProgram.envVersion];

export function Request<T>(
  url: WechatMiniprogram.RequestOption["url"],
  method: WechatMiniprogram.RequestOption["method"],
  { data, header }: BasicProps
) {
  return new Promise<T>((resolve, reject) => {
    wx.request({
      url: "https://m1.apifoxmock.com/m1/2761241-484416-default/login?apifoxResponseId=683439362",
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
        console.log(profile);
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as T);
        } else if (res.statusCode === 403) {
          refreshToken(url, method, { data, header })
            .then((data) => {
              resolve(data as T);
            })
            .catch((error) => {
              reject(error);
            });
        }
      },
      fail(error) {
        console.error("request::" + url + "/" + error);
        reject(error);
      },
      complete() {
        console.log("complete" + url);
      },
    });
  });
}
function refreshToken(url?: WechatMiniprogram.RequestOption["url"], method?: WechatMiniprogram.RequestOption["method"], options?: BasicProps) {
  return new Promise((resolve, reject) => {
    storage.remove("Authorization");
    // 刷新token
    if (storage.get("refreshAuthorization")) {
      wx.request({
        url: baseUrl + "/refreshAuthorization",
        method: "POST",
        header: {
          refreshAuthorization: storage.get("refreshAuthorization"),
        },
        success(res: any) {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            storage.set("Authorization", res.data?.Authorization);
            storage.set("refreshAuthorization", res.data?.refreshAuthorization);
            //$ 重新请求
            if (url) {
              Request(url, method, { data: options?.data, header: options?.header })
                .then((data) => {
                  resolve(data);
                })
                .catch((error) => {
                  reject(error);
                });
            }
          }
        },
        fail(error) {
          console.error("refreshAuthorization::" + error);
          storage.clear();
          reject(error);
        },
      });
    }
  });
}
export function SSE(
  url: WechatMiniprogram.RequestOption["url"],
  method: WechatMiniprogram.RequestOption["method"],
  { header, data, onMessage, onConnect, onError, onClose }: RequestOptions
) {
  let requestTask = wx.request({
    url,
    method,
    header: {
      Authorization: storage.get("Authorization"),
      ...header,
    },
    responseType: "text",
    useHighPerformanceMode: globalData.deviceInfo.platform == "android" ? true : false, // 仅android
    data,
    enableChunked: true,
    success: (res) => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
      } else if (res.statusCode === 403) {
        storage.remove("Authorization");
        // 刷新token
        if (storage.get("refreshAuthorization")) {
          wx.request({
            url: baseUrl + "/refreshAuthorization",
            method: "POST",
            header: {
              refreshAuthorization: storage.get("refreshAuthorization"),
            },
            success(res: any) {
              if (res.statusCode >= 200 && res.statusCode < 300) {
                storage.set("Authorization", res.data?.Authorization);
                storage.set("refreshAuthorization", res.data?.refreshAuthorization);
                //$ 重新请求
                requestTask = SSE(url, method, { header, data, onMessage, onConnect, onError, onClose }).task;
              }
            },
            fail(error) {
              console.error("refreshAuthorization::" + error);
              storage.clear();
            },
          });
        }
      }
    },
    fail: (err) => {
      onError && onError(err);
      onClose && onClose();
    },
    complete: (res) => {},
  });
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

  return {
    abort() {
      requestTask.abort();
      requestTask.offHeadersReceived();
      requestTask.offChunkReceived();
      onClose && onClose();
    },
    task: requestTask,
  };
}
/**
 * @description 创建一个请求, 支持SSE
 *
 * @param {string} url
 * @param {WechatMiniprogram.RequestOption["method"]} method
 * @param {RequestOptions} options
 * @returns {Promise<T> | { abort: () => void}}
 */
export function Request_SSE<T>(
  url: WechatMiniprogram.RequestOption["url"],
  method: WechatMiniprogram.RequestOption["method"],
  { data, header, enableChunked, onMessage, onConnect, onError, onClose }: RequestOptions = { enableChunked: false }
): Promise<T> | { abort: () => void } {
  let requestTask: WechatMiniprogram.RequestTask | undefined = void 0;
  const baseUrl = apiConfig.baseUrl[globalData.accountInfo.miniProgram.envVersion];
  const pro = new Promise<T>((resolve, reject) => {
    requestTask = wx.request({
      url: baseUrl + url,
      method,
      header: {
        Authorization: storage.get("Authorization"),
        ...header,
      },
      timeout: 1000 * (apiConfig.timeout || 20),
      responseType: "text",
      useHighPerformanceMode: globalData.deviceInfo.platform == "android" ? true : false, // 仅android
      data,
      enableChunked: enableChunked,
      success(res) {
        console.log(url + "请求成功", res);
        // 网络调试信息
        const profile = res.profile;
        console.log(profile);
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as T);
        } else if (res.statusCode === 403) {
          storage.remove("Authorization");
          // 刷新token
          if (storage.get("refreshAuthorization")) {
            wx.request({
              url: baseUrl + "/refreshAuthorization",
              method: "POST",
              header: {
                refreshAuthorization: storage.get("refreshAuthorization"),
              },
              success(res: any) {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                  storage.set("Authorization", res.data?.Authorization);
                  storage.set("refreshAuthorization", res.data?.refreshAuthorization);
                  //$ 重新请求
                  const req = Request_SSE(url, method, Object.assign({ data, header, enableChunked, onMessage, onConnect, onError, onClose }));
                  if (enableChunked) {
                    requestTask = (req as { abort: () => void; task: WechatMiniprogram.RequestTask }).task;
                  } else {
                    (req as Promise<T>)
                      .then((data) => {
                        resolve(data);
                      })
                      .catch((error) => {
                        reject(error);
                      });
                  }
                }
              },
              fail(error) {
                console.error("refreshAuthorization::" + error);
                storage.clear();
                reject(error);
              },
            });
          }
        }
      },
      fail(error) {
        console.error("request::" + url + "/" + error);
        reject(error);
      },
      complete() {
        console.log("complete::" + url);
      },
    });
    if (enableChunked) {
      requestTask.onHeadersReceived((res) => {
        if (res.statusCode === 200) {
          onConnect && onConnect();
        } else if (res.statusCode === 403) {
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

  const sse = {
    abort() {
      requestTask?.abort();
      requestTask?.offHeadersReceived();
      requestTask?.offChunkReceived();
      onClose && onClose();
    },
    task: requestTask,
  };
  if (enableChunked) {
    return sse;
  } else {
    return pro;
  }
}
