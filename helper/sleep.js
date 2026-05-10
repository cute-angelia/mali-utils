// 暂停执行指定毫秒
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
