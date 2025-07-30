Component({
  properties: {
    tabs: {
      type: Array,
      value: [],
    },
  },
  lifetimes: {
    attached() {},
    ready() {
      this.createSelectorQuery()
        .selectAll(".ax-tabs-item")
        .boundingClientRect((res) => {
          // this.setData({
          //   rectWidthList: res.map((item) => item.width),
          // });
        })
        .exec();
    },
  },
  data: {
    rectWidthList: [],
    left: 0,
    curIndex: 0,
  },
  methods: {
    f_move(index: number) {
      console.log("f_move", index);
      this.setData({
        curIndex: index,
        left: this.data.rectWidthList[index],
      });
    },
  },
});
