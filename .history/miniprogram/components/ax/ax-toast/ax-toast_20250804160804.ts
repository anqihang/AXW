Component({
  properties: {
    text: {
      type: String,
      value: "",
    },
    duration: {
      type: Number,
      value: 1500,
    },
    icon: {
      type: String,
      value: "",
      options: ["success", "error", "warn", "info"],
    },
    boxStyle: {
      type: String,
      value: "",
    },
    boxClass: {
      type: String,
      value: "",
    },
    hideMask: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    isShow: false,
    visible: false,
    iconName: "",
    promiseResolve: (v: any) => {},
    promiseReject: () => {},
  },
  lifetimes: {
    attached() {
      switch (this.properties.icon) {
        case "success":
          {
            this.setData({
              iconName: "icon--line-md icon--line-md--confirm",
            });
          }
          break;
        case "error":
          {
            this.setData({
              iconName: "icon--codicon icon--codicon--error",
            });
          }
          break;
        case "warn":
          {
            this.setData({
              iconName: "icon--iconoir icon--iconoir--warning-circle",
            });
          }
          break;
        case "info":
          {
            this.setData({
              iconName: "icon--iconoir icon--iconoir--info-circle",
            });
          }
          break;
      }
    },
    ready() {
      setTimeout(() => {
        this.setData({
          show: false,
        });
        this.data.promiseResolve("");
      }, this.data.duration || this.properties.duration);
    },
    detached() {},
  },
  methods: {
    f_showToast(options: { title: string; icon: string; duration: number }) {
      return new Promise((resolve, reject) => {
        this.setData({
          isShow: true,
          visible: true,
          [options?.title ? "title" : ""]: options?.title,
          [options?.icon ? "icon" : ""]: options?.icon,
          [options?.duration ? "duration" : ""]: options?.duration,

          promiseResolve: resolve,
          promiseReject: reject,
        });
      });
    },
    f_transitionEnd() {
      if (!this.data.isShow) {
        this.setData({
          visible: false,
        });
      }
    },
  },
});
