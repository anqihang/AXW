import { timeTick } from "/utils/util";
Component({
  properties: {
    hidden: {
      type: Boolean,
      value: true,
      observer(v) {
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
    },
  },
  pageLifetimes: {},
  data: {
    opusList: [
      { id: 1, title: "title", nickName: "nickName", time: new Date("2025-07-12") },
      { id: 2, title: "title" },
      { id: 3, title: "title" },
    ],
  },
  methods: {
    f_timeTick(time: Date) {
      console.log(time, "时间");
      return timeTick(time);
    },
  },
});
