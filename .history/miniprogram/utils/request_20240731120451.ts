const app = getApp();
const { globalData } = app;
export function Request(
  url: WechatMiniprogram.RequestOption["url"],
  method: WechatMiniprogram.RequestOption["method"],
  data: WechatMiniprogram.RequestOption["data"],
  header?: WechatMiniprogram.RequestOption["header"]
) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      header,
      timeout: 1000 * 20,
      //   responseType: "text",
      useHighPerformanceMode: globalData.ios ? false : true, // 仅android
      data,
      success(res) {
        // 网络调试信息
        const profile = res.profile;
        // 成功
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
        }
      },
      fail(error) {
        console.error("ax", error);
        reject(error);
      },
    });
  });
}