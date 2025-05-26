import { apiLogin } from "./api";

// app.ts
App<IAppOption>({
  globalData: {
    userInfo: {},
    defaultAvatarUrl: "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
    accountInfo: {},
    systemInfo: {},
    deviceInfo: { platform: "" },
    windowInfo: {},
    location: {},
  },
  onLaunch() {
    const accountInfo = wx.getAccountInfoSync();
    this.globalData.accountInfo = accountInfo;
    // 获取系统信息
    const deviceInfo = wx.getDeviceInfo();
    this.globalData.deviceInfo.platform = deviceInfo.platform;
    console.log(this.globalData.deviceInfo, "deviceInfo");
    this.globalData.windowInfo = wx.getWindowInfo();
    console.log(this.globalData.windowInfo, "windowInfo");

    // 获取局域网ip地址
    // wx.getLocalIPAddress({
    //   success: (res) => {
    //     console.log(res, "ipAddress");
    //   },
    // });
    // 登录
    // apiLogin();
  },
});
