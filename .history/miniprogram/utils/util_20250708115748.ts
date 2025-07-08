/***
 * @description 格式化时间
 *
 * @param {Date} date 日期
 * @returns {string} 格式化后的时间
 */
export function formatTime(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  // 两位数补零
  function formatNumber(n: number) {
    const s = n.toString();
    return s[1] ? s : "0" + s;
  }

  return [year, month, day].map(formatNumber).join("-") + " " + [hour, minute, second].map(formatNumber).join(":");
}
/**
 * @description 将ArrayBuffer转成十六进制字符串
 *
 * @param {ArrayBuffer} buffer ArrayBuffer对象
 * @returns {string} 十六进制字符串
 */
export function buf2hex(buffer: ArrayBuffer): string {
  return Array.prototype.map.call(new Uint8Array(buffer), (x) => ("00" + x.toString(16)).slice(-2)).join("");
}
/**
 * @description 将十六进制字符串转成字符串
 *
 * @param {string} hex 十六进制字符串
 * @returns {string} 字符串
 */
export function hex2Str(hex: string): string {
  let str = "";
  for (var i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substring(i, 2), 16));
  }
  return str;
}
/**
 * @description 生成用户唯一值
 *
 * @param {number} userId 用户ID
 * @returns {string} 用户唯一值
 */
export function uuid(userId: number) {
  return userId + "-" + new Date().getTime();
}
