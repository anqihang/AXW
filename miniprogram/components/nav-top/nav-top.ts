// components/navTop/navTop.ts
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
    ios:false
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes:{
    attached(){
      wx.getSystemInfo({
        success: (res) => {
          const isAndroid = res.platform === 'android'
          const isDevtools = res.platform === 'devtools'
          this.setData({
            ios: !isAndroid,
            // innerPaddingRight: `padding-right: ${res.windowWidth - rect.left}px`,
            // leftWidth: `width: ${res.windowWidth - rect.left }px`,
            // safeAreaTop: isDevtools || isAndroid ? `height: calc(var(--height) + ${res.safeArea.top}px); padding-top: ${res.safeArea.top}px` : ``
          })
        }
      })
    }
  }
})