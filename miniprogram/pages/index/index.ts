// index.ts
// 获取应用实例
const app = getApp<IAppOption>();
export {};
const defaultAvatarUrl = app.globalData.defaultAvatarUrl;

Page({
  onLoad(){
    // wx.navigateTo({
    //   url:"/packageA/article/article"
    // })
  },
  data: {
    // motto: "Hello World",
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: "",
    },
    hasUserInfo: false,
    // canIUseGetUserProfile: wx.canIUse("getUserProfile"),
    // canIUseNicknameComp: wx.canIUse("input.type.nickname"),

    // 选中的tabBarIndex
    cur: 1,
  },
  // 切换tabBar
  changeTab(e: any) {
    console.log(e, 1);
    this.setData({
      cur: Number(e.detail),
    });
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: "../logs/logs",
    });
  },
  onChooseAvatar(e: any) {
    const { avatarUrl } = e.detail;
    const { nickName } = this.data.userInfo;
    this.setData({
      "userInfo.avatarUrl": avatarUrl,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    });
  },
  onInputChange(e: any) {
    const nickName = e.detail.value;
    const { avatarUrl } = this.data.userInfo;
    this.setData({
      "userInfo.nickName": nickName,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    });
  },
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: "展示用户信息", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        });
      },
    });
  },
});
