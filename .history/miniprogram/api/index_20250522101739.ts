import { Request } from "./request";
import storage from "../utils/storage";
export function apiLogin() {
  // 登录
  wx.login({
    success: (res) => {
      console.log("login",res);
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      Request("/login", "POST", { code: res.code }).then((data: any) => {
        storage.set("openid", data.openid);
      });
    },
  });
}
// 注册
export function apiSignUp() {
  return Request("/signUp", "POST", { username: "", password: "", captcha: "" }).then((data) => {});
}
// 登录
export function apiSignIn() {
  return Request("/signIn", "POST", { username: "", password: "", captcha: "" }).then((data: any) => {
    storage.set("Authorization", data.Authorization); // 短期 1 天
    storage.set("refreshAuthorization", data.refreshAuthorization); // 长期30天
  });
}
// 登出
export function apiSignOut() {
  return Request("/signOut", "POST", {}).then((data: any) => {
    storage.clear();
  });
}

export function apiGetUserInfo(params: { id: number }) {
  return Request("/user", "GET", { id: params.id });
}
