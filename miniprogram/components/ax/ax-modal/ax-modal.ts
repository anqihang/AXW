import { ComponentMethod, ComponentProp } from "typings";

interface Data {
  isShow: boolean,
  promiseResolve: (value: unknown) => void,
  promiseReject: (value: unknown) => void
}
Component<Data, ComponentProp, ComponentMethod>({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    title: {
      type: String,
      value: ""
    },
    content: {
      type: String,
      value: "内容"
    },
    showCancel: {
      type: Boolean,
      value: true
    },
    showConfirm: {
      type: Boolean,
      value: true
    },
    cancelText: {
      type: String,
      value: "取消"
    },
    confirmText: {
      type: String,
      value: "确定"
    },
    contentClass: {
      type: String,
      value: ''
    },
    cancelClass: {
      type: String,
      value: ""
    },
    confirmClass: {
      type: String,
      value: ''
    }
  },
  data: {
    isShow: false,
    promiseResolve: () => { },
    promiseReject: () => { }
  },
  methods: {
    showModal(options: { title: string; content: string; cancelText: string; confirmText: string, showCancel: boolean, showConfirm: boolean }) {
      return new Promise((resolve, reject) => {
        this.setData({
          isShow: true,
          [options?.title ? 'title' : '']: options?.title,
          [options?.content ? 'content' : '']: options?.content,
          [options?.cancelText ? 'cancelText' : '']: options?.cancelText,
          [options?.confirmText ? 'confirmText' : '']: options?.confirmText,
          showCancel:options?.showCancel!==void 0?options?.showCancel:true,
          showConfirm:options?.showConfirm!==void 0?options?.showConfirm:true,

          promiseResolve: resolve,
          promiseReject: reject,
        })
      })

    },
    f_cancel() {
      this.setData({
        isShow: false
      })
      // this.triggerEvent("cancel");
      this.data.promiseReject("");
    },
    confirm() {
      this.setData({
        isShow: false
      })
      // this.triggerEvent("confirm");
      this.data.promiseResolve("confirm");
    },
    close(){
      this.setData({
        isShow:false
      })
    }
  },
});
