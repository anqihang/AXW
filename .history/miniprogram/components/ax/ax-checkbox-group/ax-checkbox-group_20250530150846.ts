Component({
  data: {
    checkedArr: [],
  },
  methods: {
    f_checkChange(e: string) {
      console.log("change", e);
      this.triggerEvent("checkChange", e);
    },
  },
});
