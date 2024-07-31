import storage from "./storage";

const app = getApp();
const { globalData } = app;
export function Request(
  url: WechatMiniprogram.RequestOption["url"],
  method: WechatMiniprogram.RequestOption["method"],
  data?: WechatMiniprogram.RequestOption["data"],
  header?: WechatMiniprogram.RequestOption["header"]
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
      useHighPerformanceMode: globalData.systemInfo.ios ? false : true, // 仅android
      data,
      success(res) {
        // 网络调试信息
        const profile = res.profile;
        // 成功
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
        } else if (res.statusCode === 401) {
          storage.remove("Authorization");
          // 刷新token
          wx.request({
            url: "/refreshAuthorization",
            method: "POST",
            header: {
              Authorization: storage.get("Authorization"),
              refreshAuthorization: storage.get("refreshAuthorization"),
            },
            success(res: any) {
              if (res.statusCode >= 200 && res.statusCode < 300) {
                storage.set("Authorization", res.data?.Authorization);
                storage.set("refreshAuthorization", res.data?.refreshAuthorization);
                resolve(Request(url, method, data, header));
              }
            },
          });
        }
      },
      fail(error) {
        console.error("ax", error);
        reject(error);
      },
    });
  });
}
