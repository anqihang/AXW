// pages/home/home.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图
    rotatingList: [
      { id: 1, img: "https://picsum.photos/200/300" },
      { id: 2, img: "https://picsum.photos/200/300" },
      { id: 3, img: "https://picsum.photos/200/300" }
    ],
      
    categories: [
      { id: 1, text: "热门" },
      { id: 2, text: "推荐" },
      { id: 3, text: "帖子" },
      { id: 3, text: "帖子" },
      { id: 3, text: "帖子" },
      { id: 3, text: "帖子" },
      { id: 3, text: "帖子" },
      { id: 3, text: "帖子" },
      { id: 3, text: "帖子" },
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

  }
})