Component({
  properties: {
    hidden: {
      type: Boolean,
      value: false,
      observer(e) {
        console.log("home", e)
      }
    },
  },
  /**
   * 页面的初始数据
   */
  data: {
    swiperHeight:0,
    // 轮播图
    swiperList: [
      { id: 1, url: "/static/test/test.jpg" },
      { id: 2, url: "/static/test/test.jpg" },
      // { id: 2, url: "https://picsum.photos/370/210" },
      // { id: 3, url: "https://picsum.photos/370/210" },
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
      {
        id: 1,
        cover: "/static/test/test.jpg",
        title: "这里是标题，应该有两行的最多显示出来，多余的省略号处理",
        author: "这里是作者信息",
        subscribeTime: "2024年7月1日",
      }, 
      {
        id: 2,
        cover: "/static/test/test.jpg",
        title: "这里是标题，应该有两行的最多显示出来，多余的省略号处理",
        author: "这里是作者信息",
        subscribeTime: "2024年7月1日",
      },
    ],
  },
  lifetimes: {
    created() {
      console.log("home")
      
    },
    attached() {
    },
    ready() {
      const query = this.createSelectorQuery();
      query.select("#banner").boundingClientRect((rect)=>{
        console.log(rect,'项目');
        this.setData({
          swiperHeight: rect?.width / 2.4
        })
      }).exec();
    }
  },
  pageLifetimes: {
    show() {
    },
    hide() { }
  },
  methods: {
    getRect(){
     
    },
    changeSelect(e: any) {
      console.log(e);
      this.setData({
        selectCategoryId: Number(e.currentTarget.id),
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
