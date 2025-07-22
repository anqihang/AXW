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
  data: {},
});
