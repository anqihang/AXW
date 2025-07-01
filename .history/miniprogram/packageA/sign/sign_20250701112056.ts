import { apiCheckAccount, apiSignIn, apiSignUp } from "/api/index";

// const { globalData } = getApp<IAppOption>();
Component({
  data: {
    isAccount: false,
    account: "",
    accountPrompt: "",
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
      if (id === "account") {
        apiCheckAccount(this.data.account).then((data) => {
          this.setData({
            isSignUp: data.status,
          });
          if (data.message) {
            this.setData({
              accountPrompt: data.message,
            });
          }
        });
      } else if (id === "password") {
      }
    },
    f_getCaptcha() {},
    f_switchAgreement(e: WechatMiniprogram.TouchEvent) {
      console.log(e.detail?.detail);
      this.setData({ agreement: !!e.detail.detail });
    },
    async f_sign() {
      if (!this.data.agreement) {
        const modal = this.selectComponent(".modal");
        modal.showModal({
          content: "请先阅读并同意《用户服务协议》《隐私政策》",
          confirmText: "同意并登录",
        });
      } else {
        if (!this.data.isSignUp) {
          await apiSignUp({ account, password });
        }
        apiSignIn({ account, password });
      }
    },
  },
});
