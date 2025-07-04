Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    search: {
      type: Boolean,
      value: false,
    },
    value: {
      type: String,
      value: "",
    },
    placeholder: {
      type: String,
      value: "",
    },
    type: {
      type: String,
      value: "text",
    },
    cursorColor: {
      type: String,
      value: "black",
    },
    password: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    showPassword: false,
  },
  methods: {
    f_clear() {
      this.setData({ value: "" });
    },
    f_input(e: { detail: { value: any } }) {
      this.setData({
        value: e.detail.value,
      });
    },
    f_switchPassword() {
      console.log(1);
      this.setData({
        showPassword: !this.data.showPassword,
      });
      console.log(this.data.showPassword);
      if (this.data.showPassword) {
        this.setData({
          type: "password",
          password: false,
        });
      } else {
        this.setData({
          password: true,
        });
      }
      console.log(this.data.type);
    },
  },
});
