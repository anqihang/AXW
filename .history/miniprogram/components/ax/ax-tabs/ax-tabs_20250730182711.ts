import { ComponentMethod, ComponentProp } from "typings";

interface Data {
  headerHeight: number;
  rectWidthList: { left: number; width: number }[];
  left: number;
  curIndex: number;
}
Component<Data, ComponentProp, ComponentMethod>({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    tabs: {
      type: Array,
      value: [],
      observer(v: any[]) {},
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
      value: "transparent",
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
  },
  lifetimes: {
    attached() {},
    ready() {
      const query = this.createSelectorQuery().in(this);
      query
        .select(".height")
        .boundingClientRect((res) => {
          this.setData({
            headerHeight: res.height,
          });
        })
        .exec();
      query
        .selectAll(".tab")
        .boundingClientRect((res: any) => {
          this.setData({
            rectWidthList: res.map((item: any) => ({ left: item.left, width: item.width })),
          });
          this.setData({
            left: res[0].width / 2,
          });
        })
        .exec();
    },
  },
  data: {
    headerHeight: 0,
    left: 0,
    rectWidthList: [],
    curIndex: 0,
  },
  methods: {
    f_change(e: WechatMiniprogram.BaseEvent) {
      this.setData({
        curIndex: e.currentTarget.dataset.index,
        left: this.data.rectWidthList[e.currentTarget.dataset.index].left + this.data.rectWidthList[e.currentTarget.dataset.index].width / 2,
      });
      this.triggerEvent("change", { index: e.currentTarget.dataset.index });
    },
  },
});
