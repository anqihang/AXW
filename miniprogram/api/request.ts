let arrList: Function[] = [];
let isRefresh = false;
function req(r) {
  return new Promise((resolve, reject) => {
    wx.request({
      success(res) {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else if (res.statusCode === 403) {
          if (!isRefresh) {
            isRefresh = true;
            refresh();
          } else {
            new Promise((resolve1, reject) => {
              arrList.push({ options, fn: (res) => resolve1(res) });
            }).then((data) => {
              resolve(data);
            });
          }
        }
      },
    });
  });
}
function refresh1() {
  wx.request({
    url: "/refresh",

    success(res) {
      isRefresh = false;
      arrList.forEach((item) => {
        req(item.options).then((data) => item.fn(data));
      });
    },
  });
}
type BasicProps = {
  data?: WechatMiniprogram.RequestOption["data"];
  header?: WechatMiniprogram.RequestOption["header"];
};
export function Request(
  url: WechatMiniprogram.RequestOption["url"],
  method: WechatMiniprogram.RequestOption["method"],
  { data, header }: BasicProps
) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      data,
      header,
      success(res) {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else if (res.statusCode === 403) {
          if (!isRefresh) {
            isRefresh = true;
            refresh1();
          } else {
          }
      }
    })
    })
}
/**
 * @description 刷新token
 */
export function refresh() {}
