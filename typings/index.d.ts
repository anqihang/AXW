/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo: WechatMiniprogram.UserInfo | any; // 微信用户信息
    deviceInfo: any;
    windowInfo: WechatMiniprogram.WindowInfo | any; // 窗口信息
    systemInfo: (WechatMiniprogram.SystemInfo & { ios: Boolean }) | any; // 系统信息
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
