Component({
  properties: {
    value: {
      type: Boolean,
      value: false,
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    color: {
      type: String,
      value: "#39b54a",
    },
  },
  data: {
    checked: false
  },
  methods: {
    f_checkChange() {
      this.setData({
          checked: !this.data.checked
      })
      console.log(this.data.checked)
      this.triggerEvent("change", this.properties.value, { bubbles: true, composed: true });
    },
  },
});
