import { EEventType } from "XrFrame";

// pages/min/mine.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gridList: [
      { id: 0, title: "文章",icon:"../../static/MaterialSymbolsArticleOutlineRounded.svg" },
      { id: 1, title: "统计",icon:"../../static/IonStatsBars.svg" },
      { id: 2, title: "收藏",icon:"../../static/EpCollectionTag.svg" },
      { id: 3, title: "图片",icon:"" },
      { id: 4, title: "扫一扫", icon: "../../static/TablerScan.svg" },
      { id: 5, title: "小程序", icon: "../../static/IconParkOutlineWeixinMiniApp.svg" },
    ],
    list: [
      { id: 0, title: "账号", rightIcon: "../../static/MaterialSymbolsLightChevronRightRounded.svg" },
      { id: 1, title: "关于", rightIcon: "../../static/MaterialSymbolsLightChevronRightRounded.svg" },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  f_userInfo(){},
  //
  f_gradTap(e: any) {
    console.log(e, 1);
    switch (e.currentTarget.dataset.id) {
      // 扫码
      case 4: wx.scanCode({
        success(res: any) {
          console.log(res);
        }
      }); break;
    }
  },
  //退出登录
  f_logout(){
      wx.removeStorageSync('ax-username');
      wx.removeStorageSync('ax-token');
  }
})