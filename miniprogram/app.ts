// app.ts
App<IAppOption>({
  globalData: {
    defaultAvatarUrl: "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0"
  },
  onLaunch() {
    wx.getSystemInfo({
      success: (res) => {
        const isAndroid = res.platform === 'android';
        const isDevtools = res.platform === 'devtools';
        this.globalData.ios = !isAndroid && !isDevtools;
        this.globalData.safeArea = res.safeArea;
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