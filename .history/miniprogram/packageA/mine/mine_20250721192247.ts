// import { apiSignOut } from "../../api";
import { IAppOption } from "typings";
import storage from "/utils/storage";
import { PAGES } from "/router/pages";
import { apiSignOut } from "/api/index";

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
    pages: PAGES,
    isSignIn: !!storage.get("Authorization"),
    nickName: "安琦航",
    avatar: globalData.defaultAvatarUrl,
    identity: ["Lv.1", "VIP", "SVIP"],
    gridList: [
      { id: 0, title: "文章", icon: "" },
      { id: 2, title: "收藏", icon: "" },
      { id: 2, title: "关注", icon: "" },
      { id: 3, title: "统计", icon: "" },
      { id: 4, title: "扫一扫", icon: "" },
      { id: 5, title: "小程序", icon: "" },
    ],
    list: [
      { id: 0, title: "账号", rightIcon: "" },
      { id: 1, title: "关于", rightIcon: "" },
    ],
  },
  lifetimes: {
    created() {},
    attached() {},
  },
  pageLifetimes: {
    show() {},
  },
  methods: {
    f_goTo(e: any, path?: string, params?: any) {
      if (path) {
        switch (e.detail.dataset.id) {
          case 0:
            wx.navigateTo({
              url: `${path}?${params}`,
            });
            break;
          case 1:
            wx.scanCode({
              success(res) {
                console.log(res, "scan");
              },
            });
            break;
        }
      } else {
        wx.navigateTo({
          url:
            path + params
              ? "?" +
                Object.entries(params)
                  .map((i) => i.join("="))
                  .join("&")
              : "",
        });
      }
    },
    //
    f_gradTap(e: any) {
      console.log(e, 1);
      switch (e.currentTarget.dataset.id) {
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
      }
    },
    // 退出登录
    f_signOut() {
      apiSignOut();
    },
  },
});
