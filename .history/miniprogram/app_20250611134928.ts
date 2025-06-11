import { apiLogin } from "./api";

// app.ts
App<IAppOption>({
  globalData: {
    userInfo: {},
    defaultAvatarUrl: "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
    accountInfo: {} as WechatMiniprogram.AccountInfo,
    appBaseInfo: {} as WechatMiniprogram.AppBaseInfo,
    systemInfo: {} as WechatMiniprogram.SystemInfo,
    deviceInfo: {} as WechatMiniprogram.DeviceInfo,
    windowInfo: {} as WechatMiniprogram.WindowInfo,
    location: {},
  },
  onLaunch() {
    this.globalData.accountInfo = wx.getAccountInfoSync();
    console.log(this.globalData.accountInfo, "accountInfo");
    this.globalData.appBaseInfo = wx.getAppBaseInfo();
    console.log(this.globalData.appBaseInfo, "appBaseInfo");
    this.globalData.deviceInfo = wx.getDeviceInfo();
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
