// components/navTop/navTop.ts
export {};
const { globalData } = getApp<IAppOption>();
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    safeAreaTop: !(globalData.deviceInfo.platform === "ios")
      ? `height: calc(var(--height) + ${globalData.windowInfo.safeArea.top}px); padding-top: ${globalData.windowInfo.safeArea.top}px`
      : "",
  },

  /**
   * 组件的方法列表
   */
  methods: {},
  lifetimes: {
    attached() {},
  },
});
