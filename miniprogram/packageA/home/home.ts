// pages/home/home.ts
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图
    swiperList: [
      { id: 1, url: "https://picsum.photos/370/210" },
      { id: 2, url: "https://picsum.photos/370/210" },
      { id: 3, url: "https://picsum.photos/370/210" }
    ],
    // 分类
    categories: [
      { id: 1, text: "热门" },
      { id: 2, text: "推荐" },
      { id: 3, text: "帖子" },
      { id: 4, text: "帖子" },
      { id: 5, text: "帖子" },
      { id: 6, text: "帖子" },
      { id: 7, text: "帖子" },
      { id: 8, text: "帖子" },
      { id: 9, text: "帖子" },
    ],
    selectCategoryId: 1,

    // 列表
    textList: [
      { id: 1, cover: "https://picsum.photos/200/200", title: "这里是标题，应该有两行的最多显示出来，多余的省略号处理", author: "这里是作者信息", subscribeTime: "2024年7月1日" },
      { id: 2, cover: "https://picsum.photos/200/100", title: "这里是标题，应该有两行的最多显示出来，多余的省略号处理", author: "这里是作者信息", subscribeTime: "2024年7月1日" },
      { id: 3, cover: "https://picsum.photos/200/150", title: "这里是标题，应该有两行的最多显示出来，多余的省略号处理", author: "这里是作者信息", subscribeTime: "2024年7月1日" },
      { id: 4, cover: "https://picsum.photos/200/200", title: "这里是标题，应该有两行的最多显示出来，多余的省略号处理", author: "这里是作者信息", subscribeTime: "2024年7月1日" },
      { id: 5, cover: "https://picsum.photos/200/200", title: "这里是标题，应该有两行的最多显示出来，多余的省略号处理", author: "这里是作者信息", subscribeTime: "2024年7月1日" },
      { id: 6, cover: "https://picsum.photos/200/200", title: "这里是标题，应该有两行的最多显示出来，多余的省略号处理", author: "这里是作者信息", subscribeTime: "2024年7月1日" },
      { id: 7, cover: "https://picsum.photos/200/200", title: "这里是标题，应该有两行的最多显示出来，多余的省略号处理", author: "这里是作者信息", subscribeTime: "2024年7月1日" },
      { id: 8, cover: "https://picsum.photos/200/200", title: "这里是标题，应该有两行的最多来，多余的省略号处理", author: "这里是作者信息", subscribeTime: "2024年7月1日" },
      { id: 9, cover: "https://picsum.photos/200/200", title: "这里是标题，应该有两行的最多显示出来，多余的省略号处理", author: "这里是作者信息", subscribeTime: "2024年7月1日" },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    console.log('home');
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
  changeSelect(e: any) {
    console.log(e);
    this.setData({
      selectCategoryId: Number(e.currentTarget.id)
    })
  },
  f_goArticle(e:any){
    wx.navigateTo({
      url:"/packageA/article/article"+`?id=${e.currentTarget.dataset.id}`,
      fail(err){
        console.log(err);
      }
    })
  }
})