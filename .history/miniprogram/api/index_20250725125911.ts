import { RequestSSE } from "./request";
import storage from "/utils/storage";
import { Account, BaseResponse } from "typings/api";


export function apiCheckAccount(username: string) {
  return RequestSSE<BaseResponse>("/checkAccount", "POST", { data: { username } });
}
// 注册
export function apiSignUp({ username, password, captcha }: { username: string; password: string; captcha: string }) {
  return RequestSSE<BaseResponse>("/signUp", "POST", { data: { username, password, captcha } });
}
// 登录
export function apiSignIn({ username, password }: { username: string; password: string }) {
  return new Promise((resolve, reject) => {
    RequestSSE<{ Authorization: string }>("/signIn", "POST", { data: { username, password } })
      .then((res) => {
        // 更新带有 用户id 的token
        storage.set("Authorization", res.Authorization);
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
// 登出
export function apiSignOut() {
  return RequestSSE<BaseResponse>("/signOut", "POST").then(() => {
    storage.clear();
    wx.reLaunch({
      url: "/pages/index/index",
    });
  });
}
// 获取用户信息
export function apiGetAccountInfo(params: { id: number }) {
  return RequestSSE<Account>("/accounts/" + params.id, "GET").then((data) => {
    globalData.userAccount = data;
  });
}
