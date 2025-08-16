Component({
  options: {
    multipleSlots: true,
  },
  properties: {
    isStart: {
      type: Boolean,
      value: false,
    },
    icon: {
      type: String,
      value: "circle",
      options: ["circle", "bell", "finish", "error"],
    },
    scroll: {
      type: Boolean,
      value: false,
    },
  },
  data: {},
});
