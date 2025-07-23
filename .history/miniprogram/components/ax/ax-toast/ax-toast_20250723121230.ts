Component({
  properties: {
    show: {
      type: Boolean,
      value: false,
    },
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
    iconName: "",
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
      }, 1000 * this.properties.duration);
    },
    detached() {},
  },
  methods: {
    hide() {
      this.setData({
        show: false,
      });
    },
  },
});
