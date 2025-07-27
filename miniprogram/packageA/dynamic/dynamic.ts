import { ComponentMethod, ComponentProp } from "typings";
import { u_timeTick } from "/utils/util";
interface Data {
  opusList: { id: number; title: string; nickName: string; time: Date; timeTick: string }[];
}
Component<Data, ComponentProp, ComponentMethod>({
  properties: {
    hidden: {
      type: Boolean,
      value: true,
      observer(v: boolean) {
        if (!v) {
          console.log("dynamic加载");
        }
      },
    },
  },
  lifetimes: {
    created() {
      console.log("dynamic created");
    },
    attached() {
      console.log("dynamic attached");
      this.f_getList();
    },
    ready() {
    }
  },
  pageLifetimes: {},
  data: {
    opusList: [
      { id: 1, title: "title", nickName: "nickName", time: null, timeTick: "" },
      { id: 2, title: "title", nickName: "nickName", time: null, timeTick: "" },
      { id: 3, title: "title", nickName: "nickName", time: null, timeTick: "" },
    ],
  },
  methods: {
    f_getList() {
      this.setData({
        opusList: this.data.opusList.map((item) => {
          item.time = new Date("2024-01-01");
          item.timeTick = u_timeTick(item.time);
          return item;
        })
      })
    },
  },
});
