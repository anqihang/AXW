// import { apiSignOut } from "../../api";
import storage from "../../utils/storage";

// pages/min/mine.ts
const { globalData } = getApp<IAppOption>();

Component({
  properties: {
    hidden: {
      type: Boolean,
      value: true,
      observer(e) {
        if (!e) console.log("加载mine");
      },
    },
  },
  /**
   * 页面的初始数据
   */
  data: {
    globalData,
    isSignIn: storage.get("Authorization"),
    nickName: "安琦航",
    avatar: globalData.defaultAvatarUrl,
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
      { id: 0, title: "账号", rightIcon: "" },
      { id: 1, title: "关于", rightIcon: "" },
    ],
  },
  lifetimes: {
    created() {
    },
    attached() {
    },
  },
  pageLifetimes: {
    show() {},
  },
  methods: {
    // 去登录
    f_goSignIn() {
      wx.navigateTo({
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
      // apiSignOut();
    },
  },
});
