import { ComponentMethod, ComponentProp } from "typings";

interface Data {
  headerHeight: number;
  rectWidthList: { left: number; width: number }[];
  left: number;
  curIndex: number;
  isScroll: boolean;
}
Component<Data, ComponentProp, ComponentMethod>({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    tabs: {
      type: Array<{ id: number; name: string; badge: number | string }>,
      value: [],
    },
    activeIndex: {
      type: Number,
      value: 0,
      observer(v: number) {
        this.f_change(v);
      },
    },
    color: {
      type: String,
      value: "#000000",
    },
    background: {
      type: String,
      value: "white",
    },
    underlineColor: {
      type: String,
      value: "#000000",
    },
    fontStyle: {
      type: String,
      value: "",
    },
    headerClass: {
      type: String,
      value: "",
    },
    selectClass: {
      type: String,
      value: "",
    },
    center: {
      type: Boolean,
      value: false,
    },
    justify: {
      type: String,
      value: "center",
      options: ["center", "flex-start", "flex-end", "space-around", "space-between", "space-evenly"],
    },
  },
  lifetimes: {
    attached() {},
    ready() {
      this.createSelectorQuery()
        .in(this)
        .select(".height")
        .boundingClientRect((res) => {
          this.setData({
            headerHeight: res.height,
          });
        })
        .exec();
      this.createSelectorQuery()
        .in(this)
        .select(".content")
        .boundingClientRect((res) => {
          this.setData({
            width: res.width,
          });
          const parentLeft = res.left;
          const parentWidth = res.width;
          this.createSelectorQuery()
            .in(this)
            .selectAll(".tab")
            .boundingClientRect((res: any) => {
              const setLeft = (res: any) => {
                this.setData({
                  rectWidthList: res.map((item: any) => ({ left: item.left - parentLeft, width: item.width })),
                });
                this.setData({
                  left: res[0].left + res[0].width / 2,
                });
              };
              if (res.at(-1)?.right > parentWidth) {
                this.setData({
                  center: false,
                  isScroll: true,
                });
                this.createSelectorQuery()
                  .in(this)
                  .selectAll(".tab")
                  .boundingClientRect((res: any) => {
                    setLeft(res);
                  })
                  .exec();
              } else {
                setLeft(res);
              }
            })
            .exec();
        })
        .exec();
    },
  },
  data: {
    headerHeight: 0,
    left: 0,
    rectWidthList: [],
    curIndex: 0,
    isScroll: false,
    width: 0,
    scrollLeft: 0,
  },
  methods: {
    f_change(e: WechatMiniprogram.BaseEvent) {
      console.log(e);
      console.log(this.data.width)
      this.setData({
        curIndex: e.currentTarget.dataset.index,
        left: this.data.rectWidthList[e.currentTarget.dataset.index].left + this.data.rectWidthList[e.currentTarget.dataset.index].width / 2,
      });
      // if (this.data.rectWidthList[e.currentTarget.dataset.index].left - this.data.scrollLeft > this.data.width / 2) {
      //   this.setData({
      //     scrollLeft:
      //       this.data.rectWidthList[e.currentTarget.dataset.index].left -
      //       this.data.rectWidthList[e.currentTarget.dataset.index].width / 2 -
      //       this.data.width / 2,
      //   });
      // }

      this.triggerEvent("change", { index: e.currentTarget.dataset.index });
    },
  },
});
