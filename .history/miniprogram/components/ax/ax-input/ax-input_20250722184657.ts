Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    // 显示搜索图标
    search: {
      type: Boolean,
      value: false,
    },
    // 值
    value: {
      type: String,
      value: "",
    },
    // 占位
    placeholder: {
      type: String,
      value: "",
    },
    // 类型
    type: {
      type: String,
      value: "text",
    },
    // 光标颜色
    cursorColor: {
      type: String,
      value: "black",
    },
    // 密码图标
    password: {
      type: Boolean,
      value: false,
    },
    // 背景色
    background: {
      type: String,
      value: "white",
    },
    // border宽度
    borderWidth: {
      type: Number,
      value: 0,
    },
    // border颜色
    borderColor: {
      type: String,
      value: "black",
    },
    // 圆角大小
    rounded: {
      type: Number,
      value: 4,
    },
    // 显示警告
    showPrompt: {
      type: Boolean,
      value: false,
    },
    // 警告信息
    prompt: {
      type: String,
      value: "",
    },
    // 禁用
    disabled: {
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
    f_focus() {
      this.triggerEvent("focus");
    },
    f_input(e: { detail: { value: any } }) {
      this.triggerEvent("input", e.detail.value);
    },
    f_blur() {
      this.triggerEvent("blur");
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
    },
  },
});
