Component({
  data: {
    checkedArr: [],
  },
  methods: {
    f_checkChange(e) {
      console.log("change", e);
      this.triggerEvent("checkChange", e);
    },
  },
});
