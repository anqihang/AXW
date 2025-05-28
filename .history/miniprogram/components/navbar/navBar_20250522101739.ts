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
    backButton: {
      type: Boolean,
      value: true,
    },
    homeButton: {
      type: Boolean,
      value: true,
    },
    existLeft: {
      type: Boolean,
      value: true,
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    platform: globalData.deviceInfo.platform,
    leftWidth: "0px",
    contentPaddingRight: "0px",
  },
  /**
   * 组件的方法列表
   */
  methods: {
    f_goBack(){
      wx.navigateBack();
    },
    f_goHome(){
      wx.reLaunch({
        url:"/pages/index/index?page=home"
      })
    }
  },
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
      // 
      const pages = getCurrentPages();
      if(pages.length>0){
        this.setData({
          backButton:true,
          homeButton:false
        })
      }else{
        this.setData({
          backButton:false,
          homeButton:true
        })
      }
      console.log(pages,'yeman')
    },
    attached() {},
  },
});
