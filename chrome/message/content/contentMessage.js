export class ContentMessage {
  /**
   * @param {string} queryEvent    - 监听的请求事件名
   * @param {string} responseEvent - 回复的响应事件名
   */
  constructor(queryEvent, responseEvent) {
    this.queryEvent = queryEvent;
    this.responseEvent = responseEvent;
  }

  // Content Script 端：监听请求并执行回调
  listenMessage(handler) {
    window.addEventListener(this.queryEvent, async (event) => {
      const { requestId, action, params } = event.detail;
      try {
        const result = await handler(action, params);
        this._reply(requestId, result);
      } catch (error) {
        this._reply(requestId, { error: error.message });
      }
    });
  }

  sendMsgToBackground(action, data) {
    return chrome.runtime.sendMessage({ action, data });
  }

  // 内部回复方法
  _reply(requestId, data) {
    window.dispatchEvent(new CustomEvent(this.responseEvent, {
      detail: { requestId, data }
    }));
  }
}