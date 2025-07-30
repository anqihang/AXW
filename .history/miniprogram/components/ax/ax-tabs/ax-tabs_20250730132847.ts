Component({
  properties: {
    tabs: {
      type: Array,
      value: [],
      observer(newVal) {
        // this.setData({
        //   rectWidthList: newVal.map((item) => item.rectWidth),
        // });
      },
    },
  },
  lifetimes: {
    attached() {},
    ready() {
      const query = this.createSelectorQuery().in(this);
      query
        .select(".height")
        .boundingClientRect((res) => {
          this.setData({
            headerHeight: res.height,
          });
        })
        .exec();
      query
        .selectAll(".tab")
        .boundingClientRect((res) => {
          console.log(res, "bjv2");
          this.setData({
            rectWidthList: res.map((item) => ({ left: item.left, width: item.width })),
          });
        })
        .exec();
    },
  },
  data: {
    headerHeight: 0,
    rectWidthList: [],
    left: 0,
    curIndex: 0,
  },
  methods: {
    f_change(e: WechatMiniprogram.BaseEvent) {
      console.log("f_move", e);
      this.setData({
        curIndex: e.currentTarget.dataset.index,
        left: this.data.rectWidthList[e.currentTarget.dataset.index].left + this.data.rectWidthList[e.currentTarget.dataset.index].width / 2,
      });
    },
  },
});
