import { IAppOption } from "typings";
import { apiConfig } from "./config";
import { uuid } from "/utils/util";
const { globalData } = getApp<IAppOption>();
const baseUrl = apiConfig.BASE_URL;
export function uploadFile({
  filePath,
  fileName,
  header,
}: {
  filePath: string;
  fileName: string;
  header?: WechatMiniprogram.RequestOption["header"];
}) {
  return new Promise<string>((resolve, reject) => {
    wx.uploadFile({
      url: `${baseUrl}/upload`,
      filePath,
      name: uuid(globalData.userAccount.id) + "-" + fileName,
      header: {
        Authorization: wx.getStorageSync("token"),
        ...header,
      },
      success: (e: WechatMiniprogram.UploadFileSuccessCallbackResult) => {
        resolve(e.data);
      },
      fail: (err: WechatMiniprogram.GeneralCallbackResult) => {
        wx.showModal({
          title: "提示",
          content: err.errMsg,
          showCancel: false,
        });
        reject(err);
      },
    });
  });
}
