// index.ts
// 获取应用实例
export {};
const { globalData } = getApp<IAppOption>();
const defaultAvatarUrl = globalData.defaultAvatarUrl;

Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log("index",options);
    if(options.page==="home"){
      this.setData({
        cur:1
      })
    }
    // const page = this.selectComponent(`#page${this.data.cur}`);
    // page.onLoad();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    //  const page = this.selectComponent(`#page${this.data.cur}`);
    //  page.onLoad();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},

  data: {
    cur: 5, // 选中的tabBarIndex
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: "",
    },
    isSignIn: false, // 判断是否登录
    // canIUseGetUserProfile: wx.canIUse("getUserProfile"),
    // canIUseNicknameComp: wx.canIUse("input.type.nickname"),
  },
  // 切换tabBar
  f_changeTab(e: any) {
    console.log(e.detail);
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
