// 快速按键
export function QuicKey(key, callback) {
  // 添加事件监听器到document对象
  document.addEventListener('keydown', function (event) {
    // console.log(event.key + '键被按下了!');
    // 检查按下的键是否是'q'或'Q'
    if (event.key === key || event.key === key.toUpperCase()) {
      // 改成按钮点击
      callback()
    }
  });
}