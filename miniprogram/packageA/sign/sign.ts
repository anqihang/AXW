// const { globalData } = getApp<IAppOption>();
Component({
  data: {
    isAccount: true,
    isSignIn: true,
    account: "",
    password: "",
    captcha: "",
    agreement: false,
  },
  methods: {
    f_switchAccount() {
      console.log(12,this.data.isAccount)
      this.setData({ isAccount: !this.data.isAccount });
    },
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
