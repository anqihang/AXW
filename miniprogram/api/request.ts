import { u_buf2hex, u_hex2Str, u_splicingJson } from "/utils/util";
import u_storage from "../utils/storage";
import { apiConfig } from "./config";
import { ERRNO } from "./net_error";
import { IAppOption } from "typings";

const { globalData } = getApp<IAppOption>();
const baseUrl = apiConfig.BASE_URL;

type BasicProps = {
  data?: WechatMiniprogram.RequestOption["data"];
  header?: WechatMiniprogram.RequestOption["header"];
  hideModal?: boolean;
};
type SSEEvent = {
  onMessage: (e: any[]) => void;
  onConnect: () => void;
  onClose: () => void;
  onError: (e: any) => void;
};
type RequestOptions = BasicProps & (({ enableChunked: true } & SSEEvent) | ({ enableChunked?: false } & Partial<SSEEvent>));
type SSEObj = { abort: () => void; task: WechatMiniprogram.RequestTask };
type Response = string | WechatMiniprogram.IAnyObject | ArrayBuffer;
let reqList: {
  url: string;
  method: WechatMiniprogram.RequestOption["method"];
  options: BasicProps & Partial<SSEEvent> & { enabedChunked?: boolean };
  callback_resolve: (data: any) => void;
  callback_reject: (error: WechatMiniprogram.RequestFailCallbackErr) => void;
}[] = [];
let isRefreshing = false;
/**
 * @Description 刷新访问令牌的函数。当请求返回 403 状态码时，会调用此函数来刷新访问令牌。
 * @Description 刷新成功后，会重新发起之前因令牌过期而被暂存的请求。
 * @returns {Promise<boolean>} 一个 Promise，刷新成功时 resolve 为 true，失败时 reject 错误信息。
 */
export function refreshToken(): Promise<Boolean> {
  return new Promise((resolve, reject) => {
    // 发起微信小程序的网络请求，用于刷新访问令牌
    wx.request({
      // 请求的 URL，使用基础 URL 加上刷新令牌的路径
      url: baseUrl + "/refresh",
      // 请求方法为 POST
      method: "POST",
      // 请求头，携带刷新令牌
      header: {
        RefreshAuthorization: u_storage.get("RefreshAuthorization"),
      },
      /**
       * 请求成功的回调函数
       * @param  res - 请求成功的响应对象
       */
      success(res: WechatMiniprogram.RequestSuccessCallbackResult<{ Authorization: string }>) {
        // 检查响应状态码是否在 200 到 299 之间，表示请求成功
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // 将新的访问令牌存储到本地
          u_storage.set("Authorization", res.data?.Authorization);
          // 标记刷新过程结束
          isRefreshing = false;
          // 遍历暂存的请求列表
          reqList.forEach(({ url, method, options, callback_resolve, callback_reject }) => {
            // 重新发起之前因令牌过期而被暂存的请求
            RequestSSE(url, method, options)
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

/**
 * @description requestTask对象
 */
const RequestTaskObj: { [key: WechatMiniprogram.RequestOption["url"]]: WechatMiniprogram.RequestTask } = {};

export function RequestSSE<T extends Response>(
  url: WechatMiniprogram.RequestOption["url"],
  method: WechatMiniprogram.RequestOption["method"]
): Promise<T>;
export function RequestSSE<T extends Response>(
  url: WechatMiniprogram.RequestOption["url"],
  method: WechatMiniprogram.RequestOption["method"],
  options: RequestOptions & { enableChunked?: false }
): Promise<T>;
export function RequestSSE(
  url: WechatMiniprogram.RequestOption["url"],
  method: WechatMiniprogram.RequestOption["method"],
  options: RequestOptions & { enableChunked: true }
): Promise<SSEObj>;

export function RequestSSE(
  url: WechatMiniprogram.RequestOption["url"],
  method: WechatMiniprogram.RequestOption["method"],
  { data, header, enableChunked, hideModal, onMessage, onConnect, onError, onClose }: RequestOptions = { hideModal: true, enableChunked: false }
) {
  return new Promise((resolve, reject) => {
    let requestTask = wx.request({
      url: baseUrl + url,
      method,
      header: {
        Authorization: u_storage.get("Authorization") || void 0,
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
        // #region
        // if (statusCode >= 200 && statusCode < 300) {
        //   if (!enableChunked) {
        //     resolve(res.data);
        //   } else {
        //     let sse = {
        //       abort() {
        //         requestTask.abort();
        //         requestTask.offHeadersReceived();
        //         requestTask.offChunkReceived();
        //         onClose && onClose();
        //       },
        //       task: requestTask,
        //     };
        //     resolve(sse);
        //   }
        // } else if (statusCode >= 300 && statusCode < 400) {
        //   if (statusCode === 403) {
        //     if (isRefreshing) {
        //       new Promise((resolve, reject) => {
        //         reqList.push({
        //           url,
        //           method,
        //           options: {
        //             data,
        //             header,
        //             hideModal,
        //             ...(enableChunked !== undefined ? { enableChunked } : {}),
        //             ...(onMessage !== undefined ? { onMessage } : {}),
        //             ...(onConnect !== undefined ? { onConnect } : {}),
        //             ...(onError !== undefined ? { onError } : {}),
        //             ...(onClose !== undefined ? { onClose } : {}),
        //           },
        //           callback_resolve: (data: any) => resolve(data),
        //           callback_reject: (error: any) => reject(error),
        //         });
        //         console.log("🚀 ~ success ~ method:", method);
        //       })
        //         .then((data) => {
        //           resolve(data);
        //         })
        //         .catch((error) => {
        //           reject(error);
        //         });
        //     } else {
        //       isRefreshing = true;
        //       refreshToken().then(() => {
        //         RequestSSE<T>(url, method, {
        //           data,
        //           header,
        //           ...(enableChunked ? { onMessage, onConnect, onError, onClose } : {}),
        //         }).then((data) => {
        //           if (!enableChunked) {
        //             resolve(data);
        //           } else {
        //             let sse = {
        //               abort() {
        //                 requestTask.abort();
        //                 requestTask.offHeadersReceived();
        //                 requestTask.offChunkReceived();
        //                 onClose && onClose();
        //               },
        //               task: requestTask,
        //             };
        //             resolve(sse);
        //           }
        //         });
        //       });
        //     }
        //   }
        // }
        // #endRegion
        f_disposeStatusCode({
          res,
          statusCode,
          requestTask,
          url,
          method,
          data,
          header,
          hideModal,
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
            content: ERRNO[error.errno.toString() as keyof typeof ERRNO],
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
    // 保存 requestTask 对象
    RequestTaskObj[url] = requestTask;

    if (enableChunked) {
      requestTask.onHeadersReceived((res) => {
        if (res.statusCode == 200) {
          onConnect && onConnect();
        } else {
          onError && onError(res);
        }
      });
      requestTask.onChunkReceived((res) => {
        const text = u_hex2Str(u_buf2hex(res.data));
        const sseArr = u_splicingJson(text);
        onMessage && onMessage(sseArr);
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
  hideModal,
  enableChunked,
  onMessage,
  onConnect,
  onError,
  onClose,
  resolve,
  reject,
}: {
  res: WechatMiniprogram.RequestSuccessCallbackResult<Response>;
  statusCode: number;
  requestTask: WechatMiniprogram.RequestTask;
  url: string;
  method: WechatMiniprogram.RequestOption["method"];
  data: WechatMiniprogram.RequestOption["data"] | undefined;
  header: WechatMiniprogram.RequestOption["header"] | undefined;
  hideModal: boolean | undefined;
  enableChunked: boolean | undefined;
  resolve: (data: Response | SSEObj) => void;
  reject: (data: any) => void;
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
      // 无权限
      if (isRefreshing) {
        new Promise<Response>((resolve, reject) => {
          reqList.push({
            url,
            method,
            options: {
              data,
              header,
              hideModal,
              ...(enableChunked !== undefined ? { enableChunked } : {}),
              ...(onMessage !== undefined ? { onMessage } : {}),
              ...(onConnect !== undefined ? { onConnect } : {}),
              ...(onError !== undefined ? { onError } : {}),
              ...(onClose !== undefined ? { onClose } : {}),
            },
            callback_resolve: (data: Response) => resolve(data),
            callback_reject: (error: WechatMiniprogram.RequestFailCallbackErr) => reject(error),
          });
          console.log("🚀 ~ success ~ method:", method);
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
