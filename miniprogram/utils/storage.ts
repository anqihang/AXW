import { Storage } from "typings";

const Key = "AXW_";
/**
 * @param {string} _key
 * @param _value
 * @param {boolean} sync  是否同步
 * @returns {boolean | Promise<any>}
 */
function set<T extends boolean>(_key: string, _value: any, sync: T = false as unknown as T): boolean | Promise<any> {
  const key = Key + _key;
  if (!sync) {
    try {
      wx.setStorageSync(key, _value);
    } catch (err) {
      console.error(err);
      return false;
    }
    return true;
  } else {
    return new Promise((resolve, reject) => {
      wx.setStorage({
        key,
        data: _value,
        encrypt: false, // 加密存储
        success(res) {
          resolve(res);
        },
        fail(err) {
          reject(err);
        },
      });
    });
  }
}
/**
 *
 * @param _key
 * @param sync
 * @returns {Promise<any> | any}
 */
function get(_key: string, sync: boolean = false): Promise<any> | any {
  const key = Key + _key;
  if (!sync) {
    try {
      return wx.getStorageSync(key);
    } catch (err) {
      console.error(err);
    }
  } else {
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key,
        success(res) {
          resolve(res);
        },
        fail(err) {
          reject(err);
        },
      });
    });
  }
}
/**
 *
 * @param _key
 * @returns {boolean}
 */
function remove(_key: string): boolean {
  const key = Key + _key;
  try {
    wx.removeStorageSync(key);
  } catch (err) {
    console.error(err);
    return false;
  }
  return true;
}
/**
 *
 * @returns {boolean}
 */
function clear() {
  try {
    wx.clearStorageSync();
  } catch (err) {
    console.error(err);
    return false;
  }
  return true;
}

export default {
  set,
  get,
  remove,
  clear,
} as Storage;
