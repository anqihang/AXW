import storage from "../utils/storage";
import { apiConfig } from "./config";

const { globalData } = getApp<IAppOption>();
export function Request(
  url: WechatMiniprogram.RequestOption["url"],
  method: WechatMiniprogram.RequestOption["method"],
  data: WechatMiniprogram.RequestOption["data"] = {},
  header: WechatMiniprogram.RequestOption["header"] = {}
) {
  return new Promise((resolve, reject) => {
    const baseUrl = apiConfig.baseUrl[globalData.accountInfo.miniProgram.envVersion];
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
          resolve(res.data);
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
                  Request(url, method, data, header)
                    .then((data) => {
                      resolve(data);
                    })
                    .catch((error) => {
                      reject(error);
                    });
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
        console.log("complete" + url);
      },
    });
  });
}
export function SSE(
  url: WechatMiniprogram.RequestOption["url"],
  method: WechatMiniprogram.RequestOption["method"],
  header: WechatMiniprogram.RequestOption["header"] = {},
  data: WechatMiniprogram.RequestOption["data"] = {},
  onMessage: (e: any) => void,
  onConnect: () => void,
  onError: (e: any) => void,
  onClose: () => void
) {
  const requestTask = wx.request({
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
    success: (res) => {},
    fail: (err) => {
      onError(err);
      onClose();
    },
    complete: (res) => {},
  });
  requestTask.onHeadersReceived((res) => {
    if (res.statusCode == 200) {
      onConnect();
    } else {
      onError(res);
    }
  });
  requestTask.onChunkReceived((res) => {
    const uint8Array = new Uint8Array(res.data);
    let text = String.fromCharCode.apply(null, uint8Array);
    text = decodeURIComponent(escape(text));
    onMessage(text);
  });

  return {
    abort() {
      requestTask.abort();
      requestTask.offHeadersReceived();
      requestTask.offChunkReceived();
      onClose();
    },
  };
}
