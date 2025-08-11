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
    f_pulling(e){
      if(e.detail>44){
        
      }
    },
    f_refresh() {},
  },
});
