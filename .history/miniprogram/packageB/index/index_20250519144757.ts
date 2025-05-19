// index.ts
// 获取应用实例
const app = getApp<IAppOption>();
export {};
const defaultAvatarUrl = app.globalData.defaultAvatarUrl;

Page({
  onLoad() {
    const page = this.selectComponent(`#page1`);
    console.log(page, "页面");
  },
  onHide() {
    const page = this.selectComponent(`#page${this.data.cur}`);
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

    cur: 1, // 选中的tabBarIndex
  },
  // 切换tabBar
  f_changeTab(e: any) {
    console.log(e, 1);
    // const page = this.selectComponent(`#page${e.detail}`);
    // page.onLoad();

    this.setData({
      cur: Number(e.detail),
    });

    // page.onShow();
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
