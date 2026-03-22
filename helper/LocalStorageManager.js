// 增强版的类（支持追加数据）
// storage.set('currentBlogSearch', { search: 'js', page: 1 });
// 直接追加，不需要管原来的数据是什么
// storage.update('currentBlogSearch', { sort: 'desc' });
class StorageManager {
  constructor(prefix = 'app_') {
    this.prefix = prefix;
  }

  _getKey(key) { return `${this.prefix}${key}`; }

  set(key, value) {
    localStorage.setItem(this._getKey(key), JSON.stringify(value));
  }

  get(key, defaultValue = null) {
    const data = localStorage.getItem(this._getKey(key));
    try {
      return data ? JSON.parse(data) : defaultValue;
    } catch {
      return data || defaultValue;
    }
  }

  /**
   * 追加/合并数据
   * @param {string} key 
   * @param {Object} newData 要追加的对象
   */
  update(key, newData) {
    // 1. 先取出旧数据
    const oldData = this.get(key, {});

    // 2. 确保旧数据是对象格式，然后合并
    if (typeof oldData === 'object' && oldData !== null) {
      const mergedData = { ...oldData, ...newData };
      // 3. 存回去
      this.set(key, mergedData);
      return mergedData;
    } else {
      // 如果原来不是对象（比如是字符串），则直接覆盖
      this.set(key, newData);
      return newData;
    }
  }

  remove(key) { localStorage.removeItem(this._getKey(key)); }
}

export default StorageManager;
