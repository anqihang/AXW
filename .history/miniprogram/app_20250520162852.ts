import { apiLogin } from "./api/pages";

// app.ts
App<IAppOption>({
  globalData: {
    userInfo: {},
    defaultAvatarUrl: "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
    systemInfo: {},
    deviceInfo: {},
    windowInfo: {},
  },
  onLaunch() {
    // 获取系统信息
    const deviceInfo = wx.getDeviceInfo();
    this.globalData.deviceInfo.platform = deviceInfo.platform;
    console.log(this.globalData.deviceInfo, "deviceInfo");
    this.globalData.windowInfo = wx.getWindowInfo();
    console.log(this.globalData.windowInfo, "windowInfo");

    // 获取当前地理位置
    wx.getLocation({
      type: "wgs84",
      success: (res) => {
        console.log(res, "location");
        this.globalData.location = {
          longitude: res.longitude,
          latitude: res.latitude,
        };
      },
    });
    // 获取局域网ip地址
    wx.getLocalIPAddress({
      success: (res) => {
        console.log(res, "ipAddress");
      },
    });
    // 展示本地存储能力
    // const logs = wx.getStorageSync("logs") || [];
    // logs.unshift(Date.now());
    // wx.setStorageSync("logs", logs);
    // 登录
    // apiLogin();
  },
});
