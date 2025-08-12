// packageComponents/scroll/scroll.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
      { id: 7 },
      { id: 8 },
      { id: 9 },
      { id: 10 },
      { id: 11 },
      { id: 12 },
      { id: 13 },
      { id: 14 },
      { id: 15 },
      { id: 16 },
      { id: 17 },
      { id: 18 },
      { id: 19 },
      { id: 20 },
      { id: 21 },
      { id: 22 },
      { id: 23 },
      { id: 24 },
      { id: 25 },
      { id: 26 },
      { id: 27 },
      { id: 28 },
      { id: 29 },
      { id: 30 },
      { id: 31 },
      { id: 32 },
      { id: 33 },
      { id: 34 },
      { id: 35 },
      { id: 36 },
      { id: 37 },
      { id: 38 },
      { id: 39 },
    ],
    isLoading: false,
    isNoMore: false,
    idRefresh: false,
  },

  onLoad() {},

  onReady() {},

  onShow() {},

  onHide() {},

  onUnload() {},
  onPullDownRefresh() {},

  onReachBottom() {},

  onShareAppMessage() {},
  async f_arriveBottom() {
    console.log("触底");
    if (this.data.list.length > 100) {
      this.setData({
        isNoMore: true,
      });
      return;
    }
    this.setData({
      // idLoading: true,
      isRefresh: true,
    });
    let list: { id: number }[] = [];
    for (let i = this.data.list.length, l = this.data.list.length + 20; i < l; i++) {
      list.push({ id: i });
    }
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 3000);
    });
    this.setData({
      // isLoading: false,
      // list: this.data.list.concat(list),
      list,
    });
  },
});
