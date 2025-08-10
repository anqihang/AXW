Component({
  properties: {
    showScrollBar: {
      type: Number,
      value: 0,
    },
    refresh:{
        type:Boolean,
        value:true
    }
  },
  data: {
    showScrollBar: true,
  },
  methods: {
    f_arriveBottom(){},
    f_scroll(){},
    f_pulling(){}
    f_refresh() {},
  },
});
