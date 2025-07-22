Component({
  properties: {
    hidden: {
      type: Boolean,
      value: true,
      observer(v) {
        if (!v) {
          console.log("home加载");
        }
      },
    },
  },
  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0,
    swiperHeight: 0,
    // 轮播图
    swiperList: [
      { id: 1, url: "/static/test/rain.webp" },
      { id: 2, url: "/static/test/rain.webp" },
    ],
    // 分类
    categories: [
      { id: 1, title: "热门" },
      { id: 2, title: "推荐" },
      { id: 3, title: "帖子" },
      { id: 4, title: "帖子" },
      { id: 5, title: "帖子" },
      { id: 6, title: "帖子" },
      { id: 7, title: "帖子" },
      { id: 8, title: "帖子" },
    ],
    // 列表
    textList: [
      {
        id: 1,
        cover: "/static/test/rain.webp",
        title: "这里是标题，应该有两行的最多显示出来，多余的省略号处理",
        author: "这里是作者信息",
        subscribeTime: "2024年7月1日",
      },
      {
        id: 2,
        cover: "/static/test/rain.webp",
        title: "这里是标题，应该有两行的最多显示出来，多余的省略号处理",
        author: "这里是作者信息",
        subscribeTime: "2024年7月1日",
      },
    ],
  },
  lifetimes: {
    created() {
      // hidden true
    },
    attached() {
      // hidden false
      if (!this.properties.hidden) {
        this.f_init();
      }
    },
    ready() {
      const query = this.createSelectorQuery();
      query
        .select("#banner")
        .boundingClientRect((rect) => {
          console.log(rect, 1);
          this.setData({
            swiperHeight: rect?.width / 2.4,
          });
        })
        .exec();
    },
  },
  pageLifetimes: {
    show() {},
    hide() {},
  },
  methods: {
    f_init() {},
    f_refresh() {},
    f_scroll(e: any) {
      console.log(e);
      this.setData({
        scrollTop: e.detail.scrollTop,
      });
    },
    f_scrollTop() {
      this.setData({
        scrollTop: 0,
      });
    },
    f_goArticle(e: any) {
      wx.navigateTo({
        url: "/packageA/article/article" + `?id=${e.currentTarget.dataset.id}`,
        fail(err) {
          console.log(err);
        },
      });
    },
  },
});
