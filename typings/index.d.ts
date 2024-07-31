/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo;
    ios?: Boolean;
    systemInfo?: any;
    defaultAvatarUrl: String;
    location?: any; // 位置信息 经度longitude 纬度latitude
  };
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback;
}
