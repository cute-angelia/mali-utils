
// 发送消息并返回Promise
export function sendMessageWithPromise(message) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, (response) => {
      if (chrome.runtime.lastError) {
        // 即使要reject，也要先访问lastError
        const error = chrome.runtime.lastError
        console.log('消息发送失败:', "message", message, "error", error)
        reject(error)
      } else {
        resolve(response)
      }
    })
  })
}

