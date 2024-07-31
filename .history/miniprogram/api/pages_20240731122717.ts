import { Request } from "../utils/request";
import storage from "../utils/storage";
export function login() {
  // 登录
  wx.login({
    success: (res) => {
      console.log(res.code);
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      Request("/login", "POST", { code: res.code }).then((res) => {
        storage.setStorage("token",res.data.token);
      });
    },
  });
}
export function getUserInfo(params: { id: number }) {
  return Request("/user", "GET", { id: params.id });
}
