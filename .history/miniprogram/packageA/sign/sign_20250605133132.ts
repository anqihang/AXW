// const { globalData } = getApp<IAppOption>();
Component({
  data: {
    isSignIn: true,
    account: "",
    password: "",
    captcha: "",
    agreement: false,
  },
  methods: {
    f_switchMode() {
      this.setData({ isSignIn: !this.data.isSignIn });
    },
    f_checkAccount() {},
    f_getCaptcha() {},
    f_checkPassword() {},
    f_switchAgreement() {
      this.setData({ agreement: !this.data.agreement });
    },
    f_signIn() {},
    f_signUp() {},
  },
});
