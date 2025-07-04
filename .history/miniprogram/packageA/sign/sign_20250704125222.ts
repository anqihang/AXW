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
        apiSignIn({ username: this.data.username, password: this.data.password }).then(() => {
          wx.reLaunch({ url: "/pages/index/index" });
        });
      }
    },
    f_check(type?: "username" | "password" | "captcha") {
      let pass = true;
      if (type !== "password" && type !== "captcha") {
        let prompt = "";
        if (!this.data.username) {
          prompt = "请输入用户名";
          pass = false;
        } else {
          const emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
          const phoneReg = /^1[3-9]\d{9}$/;
          if (!emailReg.test(this.data.username) && !phoneReg.test(this.data.username)) {
            prompt = "请输入正确的邮箱或手机号";
            pass = false;
          }
        }
        this.setData({
          usernamePrompt: prompt,
        });
      }
      if (type !== "username" && type !== "captcha") {
        let prompt = "";
        if (!this.data.password) {
          prompt = "请填写密码";
          pass = false;
        } else {
          if (this.data.password.length < 6) {
            prompt = "密码长度不能小于6位";
            pass = false;
          }
        }
        this.setData({
          passwordPrompt: prompt,
        });
      }
      if (type !== "username" && type !== "password") {
        if (!this.data.isSignUp) {
          let prompt = "";
          if (!this.data.captcha) {
            prompt = "请填写验证码";
            pass = false;
          } else {
            if (this.data.captcha.length !== 6) {
              prompt = "验证码格式错误";
              pass = false;
            }
          }
          this.setData({
            captchaPrompt: prompt,
          });
        }
      }

      return pass;
    },
  },
});
