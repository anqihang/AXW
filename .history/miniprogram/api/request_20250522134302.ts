import storage from "../utils/storage";

const { globalData } = getApp();
export function Request(
  url: WechatMiniprogram.RequestOption["url"],
  method: WechatMiniprogram.RequestOption["method"],
  data: WechatMiniprogram.RequestOption["data"] = {},
  header: WechatMiniprogram.RequestOption["header"] = {}
) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      header: {
        Authorization: storage.get("Authorization"),
        ...header,
      },
      timeout: 1000 * 20,
      //   responseType: "text",
      useHighPerformanceMode: globalData.platform == "android" ? true : false, // 仅android
      data,
      success(res) {
        // 网络调试信息
        const profile = res.profile;
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
        } else if (res.statusCode === 401) {
          storage.remove("Authorization");
          // 刷新token
          wx.request({
            url: "/refreshAuthorization",
            method: "POST",
            header: {
              // Authorization: storage.get("Authorization"),
              refreshAuthorization: storage.get("refreshAuthorization"),
            },
            success(res: any) {
              if (res.statusCode >= 200 && res.statusCode < 300) {
                storage.set("Authorization", res.data?.Authorization);
                storage.set("refreshAuthorization", res.data?.refreshAuthorization);
                Request(url, method, data, header);
                resolve(Request(url, method, data, header));
              }
            },
            fail(error) {
              console.error("refreshAuthorization:" + url + error);
              storage.remove("Authorization");
              storage.remove("refreshAuthorization");
              reject(error);
            },
          });
        }
      },
      fail(error) {
        console.error("request:" + url + error);
        reject(error);
      },
      complete() {
        console.log(url + "::complete");
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
    useHighPerformanceMode: globalData.platform == "android" ? true : false, // 仅android
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
