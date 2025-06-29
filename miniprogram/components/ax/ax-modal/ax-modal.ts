Component({
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
    isShow: false
  },
  methods: {
    showModal(options: { title: string; content: string; cancelText: string; confirmText: string }) {
      this.setData({
        isShow: true,
        [options?.title ? 'title' : '']: options?.title,
        [options?.content ? 'content' : '']: options?.content,
        [options?.cancelText ? 'cancelText' : '']: options?.cancelText,
        [options?.confirmText ? 'confirmText' : '']: options?.confirmText,
      })
    },
    cancel() {
      this.setData({
        isShow: false
      })
    },
    confirm() {
      this.setData({
        isShow: false
      })
    }
  },
});
