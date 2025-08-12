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
    isRefresh: {
      type: Boolean,
      value: false,
    },
    isBottomLoad: {
      type: Boolean,
      value: true,
    },
    isLoadMore: {
      type: Boolean,
      value: true,
      observer(newVal) {
        if (newVal) {
        } else {
          this.setData({
            loadText: "加载完成",
            bottomStatus: "end",
          });
        }
      },
    },
    isNoMore: {
      type: Boolean,
      value: false,
      observer(newVal) {
        if (newVal) {
          this.setData({
            loadText: "没有更多数据",
            bottomStatus: "end",
          });
        }
      },
    },
  },
  data: {
    showScrollBar: true,
    threshold: 45,
    status: "end",
    refreshText: "",
    loadText: "",
    bottomStatus: "end",
  },
  methods: {
    f_pulling(e) {
      this.setData({
        status: "pull",
        refreshText: "下拉刷新",
      });
    },
    f_willRefresh() {
      this.setData({
        status: "trigger",
        refreshText: "松手刷新",
      });
    },
    f_refresh() {
      this.triggerEvent("refresh");
      this.setData({
        status: "refresh",
        refreshText: "正在刷新",
        
      });
    },
    f_end() {
      this.setData({
        status: "end",
        refreshText: "刷新完成",
        isRefreshing: false,
      });
    },
    f_abort() {
      this.setData({
        status: "end",
        refreshText: "刷新失败",
        isRefreshing: false,
      });
    },
    f_pullBack() {},
    f_loadMore() {
      this.triggerEvent("loadMore");
      this.setData({
        bottomStatus: "trigger",
        loadText: "正在加载",
      });
    },
    f_scroll() {},
  },
});
