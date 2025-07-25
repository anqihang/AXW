// const { globalData } = getApp<IAppOption>();
Component({
  data: {
    isAccount: false,
    account: "",
    password: "",
    captcha: "",
    agreement: false,
    phoneHeight: "0px",
  },
  lifetimes: {
    created() {},
    attached() {
      wx.createSelectorQuery()
        .select(".phone")
        .boundingClientRect((res) => {
          this.setData({ phoneHeight: `${res.height}px` });
        })
        .exec();
    },
  },
  methods: {
    f_switchAccount() {
      this.setData({ isAccount: !this.data.isAccount });
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
