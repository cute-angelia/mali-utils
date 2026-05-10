// postMessage
export function PostMessage(type, data) {
  window.postMessage({
    "type": type,
    "data": data,
  }, '*');
}