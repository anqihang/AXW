import { apiCheckAccount } from "/api/index";

// const { globalData } = getApp<IAppOption>();
Component({
  data: {
    isAccount: false,
    account: "",
    accountPrompt: "",
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
    f_input(e: WechatMiniprogram.BaseEvent) {
      // this.setData({
      //   [e.currentTarget.dataset.id]: e.detail,
      // });
    },
    f_blur(e: WechatMiniprogram.BaseEvent) {
      const id = e.currentTarget.dataset.id;
      if (id === "account") {
        apiCheckAccount(this.data.account).then((data) => {
          if (!data.status && data.message) {
            this.setData({
              accountPrompt: data.message,
            });
          }
        });
      } else if (id === "password") {
      }
    },
    f_getCaptcha() {},
    f_switchAgreement(e) {
      console.log(e);
      this.setData({ agreement: !this.data.agreement });
    },
    f_sign() {},
  },
});
