// components/navTop/navTop.ts
const app = getApp<IAppOption>();
Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    ios:app.globalData.ios,
    safeAreaTop:!app.globalData.ios?`height: calc(var(--height) + ${app.globalData.safeArea.top}px); padding-top: ${app.globalData.safeArea.top}px`:''
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes:{
    attached(){
      // wx.getSystemInfo({
      //   success: (res) => {
      //     const isAndroid = res.platform === 'android'
      //     const isDevtools = res.platform === 'devtools'
      //     this.setData({
      //       ios: !isAndroid,
      //       safeAreaTop: isDevtools || isAndroid ? `height: calc(var(--height) + ${res.safeArea.top}px); padding-top: ${res.safeArea.top}px` : ``
      //     })
      //   }
      // })
    }
  }
})