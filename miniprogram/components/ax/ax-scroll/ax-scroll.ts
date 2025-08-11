Component({
  properties: {
    showScrollBar: {
      type: Number,
      value: 0,
    },
    isRefresher: {
      type: Boolean,
      value: true,
    },
    isRefreshing: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    showScrollBar: true,
    status: "end",
  },
  methods: {
    f_pulling() {
      this.setData({
        status: "pull",
      });
    },
    f_refresh() {
      this.setData({
        status: "refresh",
      });
    },
    f_end() {
      this.setData({
        status: "end",
      });
    },
    f_abort() {
      this.setData({
        status: "end",
      });
    },
    f_pullBack() {},
    f_arriveBottom() {},
    f_scroll() {},
  },
});
