Component({
  properties: {
    title: {
      type: String,
      value: "",
    },
    show: {
      type: Boolean,
      value: false,
    },
    showClose: {
      type: Boolean,
      value: true,
    },
  },
  methods: {
    close() {
      this.setData({
        show: false,
      });
    },
  },
  data: {},
});
