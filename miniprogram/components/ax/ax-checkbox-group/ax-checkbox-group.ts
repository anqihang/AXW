Component({
  data: {
  },
  methods: {
    f_checkChange(e: string) {
      this.triggerEvent("checkChange", e);
    },
  },
});
