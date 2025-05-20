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
    platform:globalData.deviceInfo.platform
  },

  /**
   * 组件的方法列表
   */
  methods: {},
  lifetimes: {
    attached() {},
  },
});
