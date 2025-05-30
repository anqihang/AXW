Component({
  properties: {
    backgroundColor: {
      type: String,
      value: "#ffffff",
    },
  },
  data: {},
  methods: {
    f_scrollTop() {
      this.triggerEvent("scrollTop");
    },
  },
});
