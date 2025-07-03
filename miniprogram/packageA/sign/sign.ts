import { apiCheckAccount, apiSignIn, apiSignUp } from "/api/index";

// const { globalData } = getApp<IAppOption>();
Component({
  data: {
    isAccount: false,
    username: "",
    usernamePrompt: "",
    isSignUp: false,
    password: "",
    passwordPrompt: "",
    captcha: "",
    agreement: false,
  },
  lifetimes: {
    created() {},
    attached() {},
  },
  methods: {
    f_switchAccount() {
      this.setData({ isAccount: !this.data.isAccount });
    },
    f_input(e: WechatMiniprogram.BaseEvent) {},
    f_blur(e: WechatMiniprogram.BaseEvent) {
      const id = e.currentTarget.dataset.id;
      if (id === "username") {
        apiCheckAccount(this.data.username).then((data) => {
          this.setData({
            isSignUp: data.status,
          });
          if (data.message) {
            this.setData({
              usernamePrompt: data.message,
            });
          }
        });
      } else if (id === "password") {
      }
    },
    f_getCaptcha() {},
    f_switchAgreement(e: WechatMiniprogram.TouchEvent) {
      console.log(e.detail.detail);
      this.setData({ agreement: e.detail.detail.checked });
    },
    async f_sign() {
      if (!this.data.username || !this.data.password || (!this.data.isSignUp && !this.data.captcha)) {
        return;
      }
      if (!this.data.agreement) {
        const modal = this.selectComponent(".modal");
        modal.showModal({
          content: "请先阅读并同意《用户服务协议》《隐私政策》",
          confirmText: "同意并登录",
        });
      } else {
        if (!this.data.isSignUp) {
          await apiSignUp({ username: this.data.username, password: this.data.password, captcha: this.data.captcha });
        }
        apiSignIn({ username: this.data.username, password: this.data.password });
      }
    },
    f_check(type: "username" | "password" | "captcha") {
      let pass = true;
      if (!this.data.username) {
        this.setData({
          usernamePrompt: "请输入用户名",
        });
        pass = false;
      } else {
        this.setData({
          usernamePrompt: "",
        });
      }
      if (!this.data.password) {
        this.setData({
          passwordPrompt: "请填写密码",
        });
        pass = false;
      } else {
        this.setData({
          passwordPrompt: "",
        });
      }
      if (!this.data.isSignUp) {
        if (!this.data.captcha) {
          this.setData({
            captchaPrompt: "请填写验证码",
          });
          pass = false;
        } else {
          this.setData({
            captchaPrompt: "",
          });
        }
      }

      return pass;
    },
  },
});
