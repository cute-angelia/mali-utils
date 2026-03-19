
/**
 * 向 Content Script 发送指令并等待响应
 *
 * @param {string} queryEvent   - 发送事件名
 * @param {string} responseEvent - 监听响应事件名
 * @param {string} action       - 指令名称
 * @param {object} params       - 参数
 * @param {number} timeout      - 超时时间(ms)，默认3秒
 */
export function sendMessageToContentScript(queryEvent, responseEvent, action, params, timeout = 3000) {
  return new Promise((resolve, reject) => {
    const requestId = (typeof crypto !== 'undefined' && crypto.randomUUID)
      ? crypto.randomUUID()
      : Math.random().toString(36).substring(2, 9);

    const timer = setTimeout(() => {
      window.removeEventListener(responseEvent, onResponse);
      reject(new Error(`请求超时: ${action} (ID: ${requestId})`));
    }, timeout);

    const onResponse = (e) => {
      if (e.detail && e.detail.requestId === requestId) {
        clearTimeout(timer);
        window.removeEventListener(responseEvent, onResponse);
        resolve(e.detail.data);
      }
    };

    window.addEventListener(responseEvent, onResponse);

    window.dispatchEvent(new CustomEvent(queryEvent, {
      detail: { requestId, action, params }
    }));
  });
}

/**
 * 
 * // 监听返回结果
// 示例：多次查询
(async () => {
  const userInfo = await sendMessageToContentScript("getUser", { id: 1 });
  console.log("用户数据:", userInfo);
  const settings = await sendMessageToContentScript("getSettings", {});
  console.log("插件配置:", settings);
})();
 * 
 * 
 */