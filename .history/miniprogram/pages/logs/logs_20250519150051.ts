// logs.ts
// const util = require('../../utils/util.js')
import { formatTime } from "../../utils/util";

Component({
  data: {
    logs: [],
  },
  lifetimes: {
    created() {
      console.log("created");
    },
    attached() {
      this.setData({
        logs: (wx.getStorageSync("logs") || []).map((log: string) => {
          return {
            date: formatTime(new Date(log)),
            timeStamp: log,
          };
        }),
      });
    },
  },
});
