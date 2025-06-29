Component({
  options: {
    multipleSlots: true
  },
  properties: {
    value: {
      type: String,
      value: "",
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    color: {
      type: String,
      value: "#39b54a",
    },
    name1: {
      type: String,
      value: ""
    }
  },
  data: {
    checked: false
  },
  methods: {
    f_checkChange() {
      this.setData({
        checked: !this.data.checked
      })
      this.triggerEvent("change", this.data.checked ? this.properties.value : '', { bubbles: true, composed: true });
    },
  },
});
