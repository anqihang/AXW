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
    f_input(e) {
      this.setData({
        [e.currentTarget.dataset.id]: e.detail,
      });
    },
    f_blur(e) {
      if (e.currentTarget.dataset.id == "account") {
        apiCheckAccount(this.data.account).then((res) => {
          this.setData({
            accountPrompt: res.data.message,
          });
        });
      }
    },
    f_checkAccount() {},
    f_getCaptcha() {},
    f_checkPassword() {},
    f_switchAgreement() {
      this.setData({ agreement: !this.data.agreement });
    },
    f_sign() {},
  },
});
