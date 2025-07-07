export function uploadFile({ filePath, name, header }: { filePath: string; name: string; header?: WechatMiniprogram.RequestOption["header"] }) {
  return new Promise<string>((resolve, reject) => {
    wx.uploadFile({
      url: "",
      filePath,
      name,
      header: {
        Authorization: wx.getStorageSync("token"),
        ...header,
      },
      success: (e: WechatMiniprogram.UploadFileSuccessCallbackResult) => {
        resolve(e.data);
      },
      fail: (err) => {
        uni.
        reject(err);
      },
    });
  });
}
