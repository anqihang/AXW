Component({
  properties: {
    checkedValue: {
      type: Array,
      value: [],
    },
  },
  data: {},
  methods: {
    f_checkChange(e: { detail: { value: string; checked: boolean } }) {
      if (e.detail.checked) {
        this.setData({
          checkedValue: this.properties.checkedValue.concat(e.detail.value),
        });
      } else {
        this.setData({
          checkedValue: this.properties.checkedValue.filter((item) => item !== e.detail.value),
        });
      }
      this.triggerEvent("checkChange", { value: e.detail.value, checked: e.detail.checked, values: this.properties.checkedValue });
    },
  },
});
