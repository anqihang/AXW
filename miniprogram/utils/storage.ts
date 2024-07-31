const Key = "AXW_";
/**
 *
 * @param {string} _key
 * @param _value
 * @param {boolean} state  是否异步
 * @param callback
 * @returns
 */
function set<T extends boolean>(_key: string, _value: any, state: T = false as unknown as T): any {
  const key = Key + _key;
  if (!state) {
    try {
      wx.setStorageSync(key, _value);
    } catch (err) {
      return false;
    }
    return true;
  } else {
    return new Promise((resolve, reject) => {
      wx.setStorage({
        key,
        data: _value,
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
function get(_key: string, state: boolean = false): any {
  const key = Key + _key;
  if (!state) {
    try {
      return wx.getStorageSync(key);
    } catch (err) {}
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
function remove(_key: string): boolean {
  const key = Key + _key;
  try {
    wx.removeStorageSync(key);
  } catch (err) {
    return false;
  }
  return true;
}
function clear() {
  try {
    wx.clearStorageSync();
  } catch (err) {
    return false;
  }
  return true;
}
export default {
  set,
  get,
  remove,
  clear,
};
