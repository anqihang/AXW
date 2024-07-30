/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo;
    ios?: Boolean;
    defaultAvatarUrl: String;
    safeArea?: any; // 安全区域 top bottom
  };
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback;
}
