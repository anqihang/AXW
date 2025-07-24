/// <reference path="./types/index.d.ts" />

import { Account } from "./api";

interface IAppOption {
  globalData: {
    userInfo: WechatMiniprogram.UserInfo | any; // 微信用户信息
    defaultAvatarUrl: String; // 默认头像
    accountInfo: WechatMiniprogram.AccountInfo; // 小程序账号信息（正式版线上）
    appBaseInfo: WechatMiniprogram.AppBaseInfo; // 小程序基础信息
    systemInfo: WechatMiniprogram.SystemInfo; // 系统信息
    deviceInfo: WechatMiniprogram.DeviceInfo; // 设备信息
    windowInfo: WechatMiniprogram.WindowInfo; // 窗口信息
    location?: any; // 位置信息 经度longitude 纬度latitude

    setting?: WechatMiniprogram.GetSettingSuccessCallbackResult;
    userAccount: Account;
    // 获取小程序设置
  };
  getSetting: () => void;
  apiLogin: () => void;
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback;
}
type storage = {
  set(key: string, value: any, sync?: boolean): Promise<any>;
  get(key: string, sync?: boolean): any | Promise<any>;
  remove(key: string): void;
  clear(): void;
};
