// app.ts
App<IAppOption>({
  globalData: {
  },
  onLaunch() {
    wx.getSystemInfo({
      success: (res) => {
        const isAndroid = res.platform === 'android'
        // const isDevtools = res.platform === 'devtools'
        this.globalData.ios=!isAndroid
        // this.setData({
        //   ios: !isAndroid,
        //   innerPaddingRight: `padding-right: ${res.windowWidth - rect.left}px`,
        //   leftWidth: `width: ${res.windowWidth - rect.left }px`,
        //   safeAreaTop: isDevtools || isAndroid ? `height: calc(var(--height) + ${res.safeArea.top}px); padding-top: ${res.safeArea.top}px` : ``
        // })
      }
    })
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
})