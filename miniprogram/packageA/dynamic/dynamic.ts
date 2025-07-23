Component({
  properties: {
    hidden: {
      type: Boolean,
      value: true,
      observer(v) {
        if (!v) {
          console.log("home加载");
        }
      },
    },
  },
  data: {
    opusList: [{id:1,title:"title",nickName:"nickName",time:"time"},{id:2,title:"title"},{id:3,title:"title"}],
  },
});
