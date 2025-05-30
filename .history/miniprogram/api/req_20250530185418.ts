let arrList: Function[] = [];
let isRefresh = false;
function req(r) {
  return new Promise((resolve, reject) => {
    wx.request({
      success(res) {
        if (res.statusCode === 200) {
          resolve(res);
        } else if (res.statusCode === 403) {
          if (!isRefresh) {
            isRefresh = true;
            refresh();
          } else {
            // return new Promise((resolve, reject) => {
            //   arrList.push((res) => {
            //     resolve(req(res));
            //   });
            // });
          }
        }
      },
    });
  });
}
function refresh() {
  wx.request({
    url: "/refresh",

    success(res) {
      isRefresh = false;
      arrList.forEach((fn) => {
        fn(res);
      });
    },
  });
}
