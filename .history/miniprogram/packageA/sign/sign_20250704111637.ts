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
        this.f_check("username");
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
        this.f_check("password");
      } else if (id === "captcha") {
        this.f_check("captcha");
      }
    },
    f_getCaptcha() {},
    f_switchAgreement(e: WechatMiniprogram.TouchEvent) {
      this.setData({ agreement: e.detail.checked });
    },
    async f_sign() {
      if (!this.f_check()) return;

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
    f_check(type?: "username" | "password" | "captcha") {
      let pass = true;
      if (type !== "password" && type !== "captcha") {
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
      }
      if (type !== "username" && type !== "captcha") {
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
      }
      if (type !== "username" && type !== "password") {
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
      }

      return pass;
    },
  },
});
