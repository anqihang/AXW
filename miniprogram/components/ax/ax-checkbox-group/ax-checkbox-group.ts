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
    f_checkChange(e: {value:string,checked:boolean}) {
      if (e.checked) {
        this.setData({
          checkedValue: this.properties.checkedValue.concat(e.value);
        })
      } else {
        this.setData({
          checkedValue: this.properties.checkedValue.filter(item => item !== e.value)
        })
      }
      this.triggerEvent("checkChange", {value:e.value,checked:e.checked,values:this.properties.checkedValue});
    },
  },
});
