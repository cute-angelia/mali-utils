// 快速按键
export function QuicKey(key, callback) {
  document.addEventListener('keydown', function (event) {
    // 如果用户正在输入框里打字，则不触发快捷键
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName) || event.target.isContentEditable) {
      return;
    }

    if (event.key.toLowerCase() === key.toLowerCase()) {
      event.preventDefault(); // 阻止浏览器默认保存等行为
      callback();
    }
  });
}