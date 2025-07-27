Component({
  properties: {
    checkedValue: {
      type: Array,
      value: [],
      observer(v){
        this.data.checkboxComp&&this.data.checkboxComp!.setData({
          checked:v.includes(this.data.checkboxComp.data.value)
        })
      }
    },
  },
  relations: {
    '../ax-checkbox/ax-checkbox': {
      type: 'child',
      linked(target) {
        this.setData({
          checkboxComp:target
        })
        target.setData({
          checked:this.properties.checkedValue.includes(target.data.value)
        })
      }
    }
  },
  data: {
    checkboxComp:null
  },
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
