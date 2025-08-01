import { IAppOption } from "typings";
import { apiConfig } from "./config";
import { u_uuid } from "/utils/util";
import u_storage from "/utils/storage";
const { globalData } = getApp<IAppOption>();
const baseUrl = apiConfig.BASE_URL;
export function uploadFile({
  filePath,
  fileName,
  onProgress,
  header,
}: {
  filePath: string;
  fileName: string;
  onProgress: (progress: WechatMiniprogram.UploadTaskOnProgressUpdateListenerResult) => void;
  header?: WechatMiniprogram.RequestOption["header"];
}) {
  return new Promise<{ url: string; abort: () => void }>((resolve, reject) => {
    const uploadTask = wx.uploadFile({
      url: `${baseUrl}/upload`,
      filePath,
      name: u_uuid(globalData.userAccount.id) + "-" + fileName,
      header: {
        Authorization: u_storage.get("token")
        ...header,
      },
      success: (e: WechatMiniprogram.UploadFileSuccessCallbackResult) => {
        resolve({ url: e.data, abort: uploadTask.abort });
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
    uploadTask.onHeadersReceived((res: WechatMiniprogram.DownloadTaskOnHeadersReceivedListenerResult) => {
      console.log("上传成功", res);
    });
    uploadTask.onProgressUpdate((res) => {
      console.log("上传进度", res.progress);
      console.log("已经上传的数据长度", res.totalBytesSent);
      console.log("预期需要上传的数据总长度", res.totalBytesExpectedToSend);
      onProgress(res);
    });
  });
}
