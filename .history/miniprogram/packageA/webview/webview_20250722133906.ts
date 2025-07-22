Component({
  properties: {
    src: {
      type: String,
      value: "",
    },
  },
  data: {},
  lifetimes: {
    created() {},
  },
  pageLifetimes: {},
  methods: {
    listen(params: Object) {
      console.log(params);
    },
  },
});
