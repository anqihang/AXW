Component({
  properties: {
    text: {
      type: String,
      value: "",
    },
    duration: {
      type: Number,
      value: 1000,
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
    promiseResolve: (v: any) => { },
    promiseReject: () => { },
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
    },
    detached() { },
  },
  methods: {
    showToast(options: { text: string; icon: string; duration: number, hideMask: boolean }) {
      console.log(options)
      return new Promise((resolve, reject) => {
        this.setData({
          isShow: true,
          visible: true,
          [options?.text ? "title" : ""]: options?.text,
          [options?.icon ? "icon" : ""]: options?.icon,
          [options?.duration ? "duration" : ""]: options?.duration,
          [options?.hideMask ? "hideMask" : ""]: options?.hideMask,

          promiseResolve: resolve,
          promiseReject: reject,
        });

      });
    },
    f_transitionEnd() {
      if (this.data.isShow) {
        setTimeout(() => {
          this.setData({
            isShow: false,
          });
          this.data.promiseResolve("");
        }, this.data.duration || this.properties.duration);
      } else {
        this.setData({
          visible: false,
        });
      }
    },
  },
});
