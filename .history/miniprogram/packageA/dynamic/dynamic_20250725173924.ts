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
  },
  pageLifetimes: {},
  data: {
    opusList: [
      { id: 1, title: "title", nickName: "nickName", time: new Date("2025-07-12"), timeTick: "" },
      { id: 2, title: "title", nickName: "nickName", time: new Date("2025-07-12"), timeTick: "" },
      { id: 3, title: "title", nickName: "nickName", time: new Date("2025-07-12"), timeTick: "" },
    ],
  },
  methods: {
    f_getList() {
      this.setData({
        opusList: this.data.opusList.map((item) => {
          // console.log(u_timeTick(item.time));
          // item.timeTick = u_timeTick(item.time);
          return item;
        }),
      });
    },
  },
});
