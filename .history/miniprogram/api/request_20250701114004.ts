import { buf2hex, hex2Str } from "/utils/util";
import storage from "../utils/storage";
import { apiConfig } from "./config";
import { ERRNO } from "./net_error";

const { globalData } = getApp<IAppOption>();
const baseUrl = apiConfig.BASE_URL;

type BasicProps = {
  data?: WechatMiniprogram.RequestOption["data"];
  header?: WechatMiniprogram.RequestOption["header"];
  hideModal?: Boolean;
};
type SSEEvent = {
  onMessage: (e: String) => void;
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
      timeout: 1000 * (apiConfig.TIMEOUT || 20),
      useHighPerformanceMode: globalData.deviceInfo.platform == "android" ? true : false, // 仅android
      data,
      success(res) {
        console.log(url + "请求成功", res);
        // 网络调试信息
        const profile = res.profile;
        const statusCode = res.statusCode;
        if (statusCode >= 200 && statusCode < 300) {
          resolve(res.data);
        } else if (statusCode >= 400 && statusCode < 500) {
          if (statusCode === 401) {
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
/**
 * @Description 刷新访问令牌的函数。当请求返回 403 状态码时，会调用此函数来刷新访问令牌。
 * @Description 刷新成功后，会重新发起之前因令牌过期而被暂存的请求。
 * @returns {Promise<boolean>} 一个 Promise，刷新成功时 resolve 为 true，失败时 reject 错误信息。
 */
export function refreshToken<T>() {
  return new Promise((resolve, reject) => {
    // 发起微信小程序的网络请求，用于刷新访问令牌
    wx.request({
      // 请求的 URL，使用基础 URL 加上刷新令牌的路径
      url: baseUrl + "/refresh",
      // 请求方法为 POST
      method: "POST",
      // 请求头，携带刷新令牌
      header: {
        RefreshAuthorization: storage.get("RefreshAuthorization"),
      },
      /**
       * 请求成功的回调函数
       * @param {any} res - 请求成功的响应对象
       */
      success(res: any) {
        // 检查响应状态码是否在 200 到 299 之间，表示请求成功
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // 将新的访问令牌存储到本地
          storage.set("Authorization", res.data?.Authorization);
          // 标记刷新过程结束
          isRefreshing = false;
          // 遍历暂存的请求列表
          reqList.forEach(({ options, callback_resolve, callback_reject }) => {
            // 重新发起之前因令牌过期而被暂存的请求
            RequestSSE<T>(options.url, options.method, options)
              .then((data) => {
                // 调用暂存请求的 resolve 回调函数
                callback_resolve(data);
              })
              .catch((error) => {
                // 调用暂存请求的 reject 回调函数
                callback_reject(error);
              });
          });

          // 清空暂存的请求列表
          reqList = [];
          // 表示刷新令牌成功
          resolve(true);
        }
      },
      /**
       * 请求失败的回调函数
       * @param {any} error - 请求失败的错误信息
       */
      fail(error) {
        // 请求失败，将错误信息 reject 出去
        reject(error);
      },
      // 请求完成的回调函数，无论成功或失败都会执行
      complete() {},
    });
  });
}

export function RequestSSE<T>(url: WechatMiniprogram.RequestOption["url"], method: WechatMiniprogram.RequestOption["method"]): Promise<T>;
export function RequestSSE<T>(
  url: WechatMiniprogram.RequestOption["url"],
  method: WechatMiniprogram.RequestOption["method"],
  options: RequestOptions & { enableChunked?: false }
): Promise<T>;
export function RequestSSE(
  url: WechatMiniprogram.RequestOption["url"],
  method: WechatMiniprogram.RequestOption["method"],
  options: RequestOptions & { enableChunked: true }
): Promise<SSEObj>;

export function RequestSSE<T>(
  url: WechatMiniprogram.RequestOption["url"],
  method: WechatMiniprogram.RequestOption["method"],
  { data, header, enableChunked, hideModal, onMessage, onConnect, onError, onClose }: RequestOptions = { hideModal: true, enableChunked: false }
) {
  return new Promise((resolve, reject) => {
    let requestTask = wx.request({
      url: baseUrl + url,
      method,
      header: {
        Authorization: storage.get("Authorization"),
        ...header,
      },
      timeout: 1000 * (apiConfig.TIMEOUT || 20),
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
                RequestSSE<T>(url, method, {
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
        f_disposeStatusCode({
          res,
          statusCode,
          requestTask,
          url,
          method,
          data,
          header,
          enableChunked,
          onMessage,
          onConnect,
          onError,
          onClose,
          resolve,
          reject,
        });
      },
      fail(error) {
        console.warn(error, url);
        if (hideModal) {
          wx.showModal({
            title: "",
            content: ERRNO[error.errno],
            showCancel: false,
            confirmText: "",
            success(res) {},
          });
        }
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
function f_disposeStatusCode({
  res,
  statusCode,
  requestTask,
  url,
  method,
  data,
  header,
  enableChunked,
  onMessage,
  onConnect,
  onError,
  onClose,
  resolve,
  reject,
}: {
  res: WechatMiniprogram.RequestSuccessCallbackResult<string | WechatMiniprogram.IAnyObject | ArrayBuffer>;
  statusCode: number;
  requestTask: WechatMiniprogram.RequestTask;
  url: string;
  method: WechatMiniprogram.RequestOption["method"];
  data: WechatMiniprogram.RequestOption["data"];
  header: WechatMiniprogram.RequestOption["header"];
  enableChunked: boolean | undefined;
  resolve: (data: string | WechatMiniprogram.IAnyObject | ArrayBuffer) => void;
  reject: (data: string | WechatMiniprogram.IAnyObject | ArrayBuffer) => void;
} & Partial<SSEEvent>) {
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
}
