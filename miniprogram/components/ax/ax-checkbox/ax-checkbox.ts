Component({
  properties: {
    value: {
      type: Boolean,
      value: false,
    },
    checked: {
      type: Boolean,
      value: false,
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    color: {
      type: String,
      value: "#09BB07",
    },
  },
  data: {},
  methods: {
    f_checkChange() {
      console.log("'tap");
      this.triggerEvent("change", this.properties.value, { bubbles: true, composed: true });
    },
  },
});
