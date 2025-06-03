// function req(r) {
//   return new Promise((resolve, reject) => {
//     wx.request({
//       success(res) {
//         if (res.statusCode === 200) {
//           resolve(res.data);
//         } else if (res.statusCode === 403) {
//           if (!isRefresh) {
//             isRefresh = true;
//             refresh();
//           } else {
//             new Promise((resolve1, reject) => {
//               arrList.push({ options, fn: (res) => resolve1(res) });
//             }).then((data) => {
//               resolve(data);
//             });
//           }
//         }
//       },
//     });
//   });
// }
// function refresh1() {
//   wx.request({
//     url: "/refresh",

//     success(res) {
//       isRefresh = false;
//       arrList.forEach((item) => {
//         req(item.options).then((data) => item.fn(data));
//       });
//     },
//   });
import storage from "../utils/storage";
import { apiConfig } from "./config";

const { globalData } = getApp<IAppOption>();
const baseUrl = apiConfig.baseUrl[globalData.accountInfo.miniProgram.envVersion];

// }
type BasicProps = {
  data?: WechatMiniprogram.RequestOption["data"];
  header?: WechatMiniprogram.RequestOption["header"];
};
let reqList: any[] = [];
let isRefresh = false;

export function Request(
  url: WechatMiniprogram.RequestOption["url"],
  method: WechatMiniprogram.RequestOption["method"],
  { data, header }: BasicProps
) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + url,
      method,
      header: {
        Authorization: storage.get("Authorization"),
        ...header,
      },
      timeout: 1000 * (apiConfig.timeout || 20),
      useHighPerformanceMode: globalData.deviceInfo.platform == "android" ? true : false, // 仅android
      data,
      success(res) {
        console.log(url + "请求成功", res);
        // 网络调试信息
        const profile = res.profile;
        const statusCode = res.statusCode;
        if (statusCode >= 200 && statusCode < 300) {
          resolve(res.data);
        } else if (statusCode >= 300 && statusCode < 400) {
          if (statusCode === 403) {
            if (isRefresh) {
              new Promise((reso, rej) => {
                reqList.push({ options: { url, method, data, header }, callback_resolve: (data: any) => reso(data),callback_reject:(error:any)=>rej(error) })
              }).then(data => {
                resolve(data)
              })
            } else {
              refreshToken();
            }
          }
        }
      },
      fail(error) {
        reject(error)
      },
      complete() { }
    })
  })
}
export function refreshToken() {
  wx.request({
    url: baseUrl + '/refresh',
    method: "POST",
    header: {
      refreshAuthorization: storage.get("refreshAuthorization"),
    },
    success(res:any) {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        storage.set("Authorization", res.data?.Authorization);

        reqList.forEach(({ options, callback_resolve,callback_reject }) => {
          Request(options.url, options.method, { data: options.data, header: options.header }).then(data => { callback_resolve(data) }).catch(error=>callback_reject(error));
        })

        reqList = [];
      }
    },
    fail() { },
    complete() { }
  })
}