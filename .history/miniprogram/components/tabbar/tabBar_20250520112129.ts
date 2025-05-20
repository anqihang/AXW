// components/tabbar/tabbar.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    tabBars: [
      { id: 1, text: "首页", icon: "/static/tabbar/home" },
      { id: 2, text: "动态", icon: "/static/tabbar/component" },
      { id: 3, text: "论坛", icon: "" },
      { id: 4, text: "实验", icon: "/static/tabbar/plugin" },
      { id: 5, text: "我的", icon: "/static/tabbar/mine" },
    ],
    cur: 1,
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {},
    hide: function () {},
    resize: function () {},
  },
  /**
   * 组件的方法列表
   */
  methods: {
    f_change(event: any) {
      console.log("切换tabBar", event.currentTarget.id);
      this.triggerEvent("changeTabBar", event.currentTarget.id);
      this.setData({
        cur: Number(event.currentTarget.id),
      });
    },
  },
});
