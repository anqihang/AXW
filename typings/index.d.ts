/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo: WechatMiniprogram.UserInfo | any; // 微信用户信息
    accountInfo: { username: string; gender: number; age: number; phone: string } | {};
    systemInfo: WechatMiniprogram.SystemInfo | {}; // 系统信息
    deviceInfo: { platform: string };
    windowInfo: WechatMiniprogram.WindowInfo | {}; // 窗口信息
    defaultAvatarUrl: String; // 默认头像
    location?: any; // 位置信息 经度longitude 纬度latitude
  };
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback;
}
type storage = {
  set(key: string, value: any, sync?: boolean): Promise<any>;
  get(key: string, sync?: boolean): any | Promise<any>;
  remove(key: string): void;
  clear(): void;
};
