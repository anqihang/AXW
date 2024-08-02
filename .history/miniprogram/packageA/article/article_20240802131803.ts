// packageA/article/article.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cur: 0,
    articleList: [
      {
        id: 0,
        name: "昵称",
        publishTime: "2024-09-12",
        content: `<div class="div_class"><h1>Title</h1><p class="p">Life is&nbsp;<i>like</i>&nbsp;a box of<b>&nbsp;chocolates</b>.</p></div>`,
      },
    ],
    curId: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options: any) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
  f_switch(e: any) {
    console.log(e);
    this.setData({
      cur: e.detail.current,
    });
  },
  f_trans(e) {
    if (e.detail.dy > 0) {
      console.log('下')
    } else {
      console.log("上");

    }
  }
});
