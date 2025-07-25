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
  pageLifetimes: {},
  lifetimes: {},
  data: {
    opusList: [
      { id: 1, title: "title", nickName: "nickName", time: "time" },
      { id: 2, title: "title" },
      { id: 3, title: "title" },
    ],
  },
  methods: {
    timeTick(time: Date) {
      return timeTick(time);
    },
  },
});
