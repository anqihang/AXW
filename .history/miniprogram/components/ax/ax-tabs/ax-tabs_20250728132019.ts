Component({
  properties: {},
  lifetimes: {
    attached() {},
    ready() {
      createQuerySelector(".ax-tabs-item").then((res) => {
        this.setData({
          rectWidthList: res.map((item) => item.width),
        });
      });
    },
  },
  data: {
    rectWidthList: [],
    left:0,
  },
  methods: {
    f_move(index: number) {
      this.setAata({
        left: this.data.rectWidthList[index];
      })
    },
  },
});
