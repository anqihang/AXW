import { Request } from "../utils/request";
import storage from "../utils/storage";
export function apiLogin() {
  // 登录
  wx.login({
    success: (res) => {
      console.log(res.code);
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      Request("/login", "POST", { code: res.code }).then((data: any) => {
        storage.setStorage("openid", data.openid);
      });
    },
  });
}
export function apiGetUserInfo(params: { id: number }) {
  return Request("/user", "GET", { id: params.id });
}
// 注册
export function apiSignUp() {}
// 登录
export function apiSignIn() {
  return Request("/signIn", "POST", { username: "", password: "", captcha: "" }).then((data: any) => {
    storage.setStorage("Authorization", data.Authorization);
  });
}
// 登出
export function apiSignOut() {
  return Request("/signOut", "POST", {});
}
