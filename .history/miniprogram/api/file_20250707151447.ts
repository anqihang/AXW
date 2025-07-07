export function uploadFile({ filePath, name, header }: { filePath: string; name: string; header?: WechatMiniprogram.RequestOption["header"] }) {
  return new Promise<WechatMiniprogram.UploadFileSuccessCallbackResult>((resolve, reject) => {
    wx.uploadFile({
      url: "",
      filePath,
      name,
      header: {
        Authorization: wx.getStorageSync("token"),
        ...header,
      },
      success: () => {},
      fail: () => {},
    });
  });
}
