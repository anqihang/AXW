import { IAppOption } from "typings";
import u_storage from "./utils/storage";
import { URL } from "/api/url";

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

    setting: {} as WechatMiniprogram.GetSettingSuccessCallbackResult,
    // 账号信息
    userAccount: {
      id: 0,
      username: "",
      nickName: "",
      sex: 0, // 0女 1男
      age: 0,
      phone: "",
      email: "",
      createTime: "",
      updateTime: "",
    },
    isSignIn: false,
  },
  onLaunch() {
    this.globalData.accountInfo = wx.getAccountInfoSync();
    console.log("app.accountInfo", this.globalData.accountInfo);
    this.globalData.appBaseInfo = wx.getAppBaseInfo();
    console.log("app.appBaseInfo", this.globalData.appBaseInfo);
    this.globalData.deviceInfo = wx.getDeviceInfo();
    console.log("app.deviceInfo", this.globalData.deviceInfo);
    this.globalData.windowInfo = wx.getWindowInfo();
    console.log("app.windowInfo", this.globalData.windowInfo);

    // 获取局域网ip地址
    // wx.getLocalIPAddress({
    //   success: (res) => {
    //     console.log(res, "ipAddress");
    //   },
    // });
    // 登录
    // this.apiLogin();
  },
  getSetting() {
    const that = this;
    wx.getSetting({
      withSubscriptions: true,
      success(res) {
        console.log("app.setting", res);
        that.globalData.setting = res;
      },
    });
  },
  // 微信登录
  apiLogin() {
    wx.login({
      success: (res) => {
        console.log("app.code", res);
        wx.request({
          url: "http://" + URL[this.globalData.accountInfo.miniProgram.envVersion] + "/login",
          method: "POST",
          timeout: 1000 * 20,
          useHighPerformanceMode: this.globalData.deviceInfo.platform == "android" ? true : false, // 仅android
          data: {
            code: res.code,
          },
          success({ data }: { data: { Authorization: string; RefreshAuthorization: string } }) {
            console.log("/login" + "请求成功", res);
            u_storage.set("Authorization", data.Authorization);
            u_storage.set("RefreshAuthorization", data.RefreshAuthorization);
          },
        });
      },
      fail(error) {
        console.log("wx.login 接口调用失败，将无法正常使用开放接口等服务", error);
        wx.showModal({
          title: "提示",
          content: "请检查网络是否正常",
          showCancel: false,
        });
      },
    });
  },
});
