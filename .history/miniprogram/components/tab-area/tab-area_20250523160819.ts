Component({
  properties: {},
  data: {
    imgSrc: "",
  },
  methods: {
    init() {
      const query = wx.createSelectorQuery();
      query
        .select("#tab-area-canvas")
        .fields({ node: true, size: true })
        .exec((res) => {
          const canvas = res[0].node;
          const ctx = canvas.getContext("2d");
          const dpr = wx.getSystemInfoSync().pixelRatio;
          canvas.width = res[0].width * dpr;
          canvas.height = res[0].height * dpr;
          ctx.scale(dpr, dpr);
          ctx.fillRect(0, 0, 100, 100);
          const imgSrc = "";
          ctx.drawImage(imgSrc, 0, 0);
          const data = ctx.getImageData(0, 0, imgSrc.width, imgSrc.height).data;
          
          //   const pic = canvas.createImage();
          //   pic.src = this.data.imgSrc;
          //   pic.onload(() => {
          //     ctx.drawImage(pic, 0, 0, 100, 100);
          //   });
        });
    },
  },
});
