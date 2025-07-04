import { RequestSSE } from "./request";
import storage from "../utils/storage";
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
    // 登录
    wx.login({
      success: (res) => {
        console.log("code", res);
        RequestSSE<{ Authorization: string; RefreshAuthorization: string; openId: string }>("/signIn", "POST", {
          data: { username, password, code: res.code },
        }).then((data) => {
          storage.set("Authorization", data.Authorization); // 短期 1 小时
          storage.set("RefreshAuthorization", data.RefreshAuthorization); // 长期30天
          storage.set("openId", data.openId);

          resolve(data);
        });
      },
      fail(error) {
        reject(error);
      },
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
