// import { differenceInYears } from "date-fns";
import dayjs from "dayjs";

/***
 * @description 格式化时间
 *
 * @param {Date} date 日期
 * @returns {string} 格式化后的时间
 */
export function u_formatTime(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  // 两位数补零
  function u_formatNumber(n: number) {
    const s = n.toString();
    return s[1] ? s : "0" + s;
  }

  return [year, month, day].map(u_formatNumber).join("-") + " " + [hour, minute, second].map(u_formatNumber).join(":");
}
/**
 * @description 将ArrayBuffer转成十六进制字符串
 *
 * @param {ArrayBuffer} buffer ArrayBuffer对象
 * @returns {string} 十六进制字符串
 */
export function u_buf2hex(buffer: ArrayBuffer): string {
  return Array.prototype.map.call(new Uint8Array(buffer), (x) => ("00" + x.toString(16)).slice(-2)).join("");
}
/**
 * @description 将十六进制字符串转成字符串
 *
 * @param {string} hex 十六进制字符串
 * @returns {string} 字符串
 */
export function u_hex2Str(hex: string): string {
  let result: string = "";
  for (var i = 0; i < hex.length; i += 2) {
    result += String.fromCharCode(parseInt(hex.substring(i, 2), 16));
  }
  return result;
}
/**
 * @description 生成用户唯一值
 *
 * @param {number} userId 用户ID
 * @returns {string} 用户唯一值
 */
export function u_uuid(userId: number): string {
  return userId + "_" + new Date().getTime().toString(36).padStart(9, "0");
}
/**
 * @description 获取时间戳
 *
 * @param {Date} _time 时间
 * @returns {string} 时间戳
 */
export function u_timeTick(_time: Date): string {
  const dif = (Date.now() - _time.getTime()) / 1000;
  // 生成文章显示的上传时间，按刚刚，1分钟前，3分钟前，1小时前，2小时前，3小时前，5小时前，半天前，1天前，3天前，7天前，半月前，1月前，3月前，4月前等等
  if (dif < 60) return "刚刚";
  if (dif < 60 * 60) return dayjs().diff(_time, "minutes") + "分钟前";
  if (dif < 60 * 60 * 12) return Math.floor(dif / 60 / 60) + "小时前";
  if (dif < 60 * 60 * 24) return "半天前";
  if (dif < 60 * 60 * 24 * 14) return Math.floor(dif / 60 / 60 / 24) + "天前";
  if (dif < 60 * 60 * 24 * 30) return "半月前";
  if (dif < 60 * 60 * 24 * 30 * 6) return dayjs().diff(_time, "month") + "月前";
  if (dif < 60 * 60 * 24 * 30 * 12) return "半年前";
  return dayjs().diff(_time, "year") + "年前";
}
/**
 * @description 将string转object[],拼接残缺的sse数据
 *
 * @param {string} _str sse数据
 * @param {function<remain:string>} callback sse数据丢失的回调，remain 丢失的数据剩余部分
 * @returns {any[]} 处理后的数据
 */
// 存储上一次的sse数据中的残缺数据
let preStr: string = "";
export function u_splicingJson(_str: string, callback?: (remain: string) => void): any[] {
  const arr = _str.replace(/data:/g, "").split("\n\n").filter(Boolean);
  let result: any[] = [];
  arr.forEach((str) => {
    try {
      result.push(JSON.parse(str));
      if (preStr.length) {
        //! 丢失数据
        callback && callback(preStr);
      }
      preStr = "";
    } catch (err) {
      // str不完整
      if (preStr.length) {
        try {
          // 字符串开头，缺失前部分,
          result.push(JSON.parse(`${preStr}${str}`));
          preStr = "";
        } catch (err) {
          // 缺失前后两部分
          preStr = `${preStr}${str}`;
        }
      } else {
        // 字符串结尾，缺失后部分
        preStr = str;
      }
    }
  });

  return result;
}
/**
 * @description 补充字节
 *
 * @param {number|string} byte 待补充的字节
 * @param {number} byteLen 字节长度
 * @param {string|number} supplementByte 补充的字节
 * @returns {string|Error}补充后的字节串
 */
export function u_supplementByte(byte: number | string, byteLen: number, supplementByte: string | number): string | Error {
  let result: string = "";
  if (byte.toString().length < byteLen) {
    result = byte.toString().padStart(byteLen, supplementByte.toString());
  } else if (byte.toString().length === byteLen) {
    result = byte.toString();
  } else {
    return new Error("字节长度超出范围");
  }
  return result;
}
