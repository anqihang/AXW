import { apiSignOut } from "../../api/pages";
import storage from "../../utils/storage";

// pages/min/mine.ts
const { globalData } = getApp<IAppOption>();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLogin: storage.get("Authorization"),
    nickName: globalData.userInfo?.nickName || "安琦航",
    avatar: globalData.userInfo?.avatarUrl || globalData.defaultAvatarUrl,
    identity: ["Lv.1", "VIP", "SVIP"],
    gridList: [
      { id: 0, title: "文章", icon: "/static/MaterialSymbolsArticleOutlineRounded.svg" },
      { id: 2, title: "收藏", icon: "/static/MiFavorite.svg" },
      { id: 2, title: "关注", icon: "/static/EpCollectionTag.svg" },
      { id: 3, title: "统计", icon: "/static/IonStatsBars.svg" },
      { id: 4, title: "扫一扫", icon: "/static/TablerScan.svg" },
      { id: 5, title: "小程序", icon: "/static/IconParkOutlineWeixinMiniApp.svg" },
    ],
    list: [
      { id: 0, title: "账号", rightIcon: "/static/MaterialSymbolsLightChevronRightRounded.svg" },
      { id: 1, title: "关于", rightIcon: "/static/MaterialSymbolsLightChevronRightRounded.svg" },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {},

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
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  // onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
  // 去登录
  f_goSignIn() {
    wx.reLaunch({
      url: "/packageA/signIn/signIn",
    });
  },
  // 去注册
  f_goSignUp() {
    wx.reLaunch({
      url: "/packageA/signUp/signUp",
    });
  },
  // 跳转到用户信息
  f_goUserInfo() {
    wx.navigateTo({
      url: "/packageA/userInfo/userInfo",
    });
  },
  //
  f_gradTap(e: any) {
    console.log(e, 1);
    switch (e.currentTarget.dataset.id) {
      case 0:
        {
          wx.navigateTo({
            url: "/packageA/article/article",
          });
        }
        break;
      case 1:
        {
          wx.navigateTo({
            url: "/packageA/reply/reply",
          });
        }
        break;
      case 2:
        {
          wx.navigateTo({
            url: "/packageA/collection/collection",
          });
        }
        break;
      case 3:
        {
          wx.navigateTo({
            url: "/packageA/statistics/statistics",
          });
        }
        break;
      // 扫码
      case 4:
        {
          wx.scanCode({
            success(res: any) {
              console.log(res);
            },
          });
        }
        break;
      case 5:
        {
          wx.navigateTo({
            url: "/packageA/miniProgram/miniProgram",
          });
        }
        break;
    }
  },
  // 退出登录
  f_signOut() {
    apiSignOut();
  },
});
