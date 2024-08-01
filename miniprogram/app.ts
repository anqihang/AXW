import { apiLogin } from "./api/pages";

// app.ts
App<IAppOption>({
  globalData: {
    defaultAvatarUrl: "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
  },
  onLaunch() {
    // 获取系统信息
    wx.getSystemInfo({
      success: (res) => {
        const isAndroid = res.platform === "android";
        const isDevtools = res.platform === "devtools";
        this.globalData.systemInfo = {
          ios: !isAndroid && !isDevtools,
        };
      },
    });
    const windowInfo = wx.getWindowInfo();
    this.globalData.systemInfo.windowWidth = windowInfo.windowWidth;
    this.globalData.systemInfo.windowHeight = windowInfo.windowHeight;
    this.globalData.systemInfo.windowHeight = windowInfo.statusBarHeight;
    this.globalData.systemInfo.safeArea = windowInfo.safeArea;
    this.globalData.systemInfo.pixelRatio = windowInfo.pixelRatio; // 设备像素比
    console.log(windowInfo.statusBarHeight, windowInfo.safeArea);

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
