/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo; // 微信用户信息
    ios?: Boolean; // 是否是ios系统
    systemInfo?: any; // 系统信息
    defaultAvatarUrl: String; // 默认头像
    location?: any; // 位置信息 经度longitude 纬度latitude
  };
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback;
}
