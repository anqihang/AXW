const { globalData } = getApp<IAppOption>();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    extClass: {
      type: String,
      value: "",
    },
    title: {
      type: String,
      value: "标题",
    },
    color: {
      type: String,
      value: "#000",
    },
    background: {
      type: String,
      value: "white",
    },
    back: {
      type: Boolean,
      value: true,
    },
    homeButton: {
      type: Boolean,
      value: true,
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    platform: globalData.systemInfo.platform,
    safeAreaTop: !(globalData.systemInfo.platform === "ios")
      ? `height: calc(var(--height) + ${globalData.windowInfo.safeArea.top}px); padding-top: ${globalData.windowInfo.safeArea.top}px`
      : "",
    leftWidth: "0px",
    contentPaddingRight: "0px",
  },
  /**
   * 组件的方法列表
   */
  methods: {},
  /**
   * 组件生命周期
   */
  lifetimes: {
    created() {
      const rect = wx.getMenuButtonBoundingClientRect();
      wx.getSystemInfo({
        success: (res) => {
          this.setData({
            contentPaddingRight: `padding-right: ${res.windowWidth - rect.left}px`,
            leftWidth: `width: ${res.windowWidth - rect.left}px`,
          });
        },
      });
    },
    attached() {},
  },
});
