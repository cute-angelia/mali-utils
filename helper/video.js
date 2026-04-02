/**
 * 综合获取视频地址（兼容直接 src 和 <source> 标签）
 * @param {string} selector - video 标签的选择器
 * @returns {string|string[]|null} 返回当前播放地址或所有候选地址列表
 */
export function getVideoSrc(selector) {
  const video = document.querySelector(selector);
  if (!video) return '未找到视频元素';

  // 1. 优先获取当前正在播放/加载的确定地址
  if (video.currentSrc) {
    return video.currentSrc;
  }

  // 2. 如果 currentSrc 为空，检查 video 标签自身的 src 属性
  if (video.src) {
    return video.src;
  }

  // 3. 如果还是没有，遍历内部所有的 <source> 标签
  const sources = video.querySelectorAll('source');
  if (sources.length > 0) {
    return Array.from(sources)
      .map(s => s.src)
      .filter(src => src); // 过滤掉空的 src
  }

  return null;
}
