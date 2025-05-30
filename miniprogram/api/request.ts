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
export function Request() {}
/**
 * @description 刷新token
 */
export function refresh() {}
