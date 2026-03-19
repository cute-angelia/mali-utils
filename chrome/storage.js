/**
 * 获取存储：由于 chrome.storage 是异步的，必须使用 async/await
 * @param {string|null} key - 传 null 或 "all" 获取全部，传字符串获取特定键
 */
export async function getChromeStorage(key) {
  // chrome.storage.local.get(null) 会返回所有内容
  const query = (key === "all" || !key) ? null : key;
  const result = await chrome.storage.local.get(query);

  if (query === null) {
    return result;
  } else {
    return result[key]; // 如果 key 不存在，这里会返回 undefined
  }
}

/**
 * 设置存储
 * @param {string} key 
 * @param {any} value - 它可以直接存对象或数组，无需手动 JSON.stringify
 */
export async function setChromeStorage(key, value) {
  await chrome.storage.local.set({ [key]: value });
}

/**
 * 清除所有存储
 */
export async function removeChromeStorage() {
  await chrome.storage.local.clear();
}