// components/navTop/navTop.ts
const app = getApp<IAppOption>();
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    ios: app.globalData.systemInfo.ios,
    safeAreaTop: !app.globalData.systemInfo.ios
      ? `height: calc(var(--height) + ${app.globalData.systemInfo.safeArea.top}px); padding-top: ${app.globalData.systemInfo.safeArea.top}px`
      : "",
  },

  /**
   * 组件的方法列表
   */
  methods: {},
  lifetimes: {
    attached() {
    },
  },
});