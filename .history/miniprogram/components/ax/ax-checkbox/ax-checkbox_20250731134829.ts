Component({
  options: {
    multipleSlots: true,
  },
  relations:{
    "../ax-checkbox-group/ax-checkbox-group":{
      "type":"parent",
      linked(target){
        console.log(target)
      }
    }
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
    checked:{
      type:Boolean,
      value:false
    }
  },
  data: {
  },
  methods: {
    f_checkChange() {
      this.setData({
        checked: !this.data.checked,
      });
      this.triggerEvent("change", { value: this.properties.value, checked: this.properties.checked }, { bubbles: true, composed: true });
    },
  },
});
