import { RequestSSE } from "./request";
import u_storage from "/utils/storage";
import { Account, BaseResponse } from "typings/api";
import { PAGES } from "/router/pages";

export function apiCheckAccount(username: string) {
  return RequestSSE<BaseResponse>("/checkAccount", "POST", { data: { username } });
}
// 注册
export function apiSignUp({ username, password, captcha }: { username: string; password: string; captcha: string | undefined }) {
  return RequestSSE<BaseResponse>("/signUp", "POST", { data: { username, password, captcha } });
}
// 登录
export function apiSignIn({ username, password }: { username: string; password: string }) {
  return new Promise((resolve, reject) => {
    RequestSSE<{ Authorization: string; RefreshAuthorization: string }>("/signIn", "POST", { data: { username, password } })
      .then((data) => {
        // 更新带有 用户id 的token
        u_storage.set("Authorization", data.Authorization);
        u_storage.set("RefreshAuthorization", data.RefreshAuthorization);
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
// 登出
export function apiSignOut() {
  return RequestSSE<BaseResponse>("/signOut", "POST").then(() => {
    u_storage.clear();
    wx.reLaunch({
      url: PAGES["home"].path,
    });
  });
}
// 获取用户信息
export function apiGetAccountInfo(params: { id: number }) {
  return RequestSSE<Account>("/accounts/" + params.id, "GET").then((data) => {
    globalData.userAccount = data;
  });
}
