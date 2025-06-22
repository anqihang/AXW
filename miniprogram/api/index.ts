import { Request, RequestSSE } from "./request";
import storage from "../utils/storage";
export function apiLogin() {
  return new Promise((resolve, reject) => {
    // 登录
    wx.login({
      success: (res) => {
        console.log("code", res);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        RequestSSE("/login", "POST", { data: { code: res.code } })
          .then((data: any) => {
            resolve(data);
            storage.set("openid", data.openid);
          })
          .catch((error) => {
            reject(error);
          });
      },
      fail(error) {
        reject(error);
      },
    });
  });
}
export function apiCheckAccount(account: string) {
  return RequestSSE("/checkAccount", "GET", { data: { account } });
}
// 注册
export function apiSignUp() {
  return RequestSSE("/signUp", "POST", { data: { username: "", password: "", captcha: "" } }).then((data) => {});
}
// 登录
export function apiSignIn() {
  return Request("/signIn", "POST", { data: { username: "", password: "", captcha: "" } }).then((data: any) => {
    storage.set("Authorization", data.Authorization); // 短期 1 天
    storage.set("refreshAuthorization", data.refreshAuthorization); // 长期30天
  });
}
// 登出
export function apiSignOut() {
  return RequestSSE("/signOut", "POST").then(() => {
    storage.clear();
  });
}

export function apiGetUserInfo(params: { id: number }) {
  return RequestSSE("/user", "GET", { data: { id: params.id } }).then((data) => {});
}
