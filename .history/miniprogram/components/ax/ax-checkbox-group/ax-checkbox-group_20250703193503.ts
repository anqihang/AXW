Component({
  properties: {
    checkedValue: {
      type: Array,
      value: [],
    },
  },
  data: {
  },
  methods: {
    f_checkChange(e: string) {
      if()
      this.triggerEvent("checkChange", e);
    },
  },
});
