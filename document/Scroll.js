/**
* 针对虚拟列表/DOM复用页面的自动滚动处理函数
这是一个非常敏锐且深刻的观察。你指出的正是现代高性能网页（如 Twitter/X、Facebook、淘宝、小红书网页版）常用的“虚拟列表” (Virtual List) 或 “DOM 复用” 技术。
在这些页面中，为了防止内存溢出，浏览器只保留当前可视区域（及其附近）的几十个 DOM 元素。当你向下滚动时，顶部的元素会被销毁或回收用来显示底部的新内容。
* @param {function} getItemsFn - 告诉脚本如何获取当前页面上的条目
* @param {function} getIdFn - 告诉脚本如何从条目中提取唯一标识符
* @param {function} callback - 真正的处理逻辑
*/
export async function scrollVirtualList(getItemsFn, getIdFn, callback, interval = 2000) {
  const processedIds = new Set();
  let lastScrollHeight = 0;
  let stopCount = 0;

  const timer = setInterval(async () => {
    // 1. 抓取当前可见的新元素
    const currentElements = getItemsFn();
    const newElements = [];

    currentElements.forEach(el => {
      const id = getIdFn(el);
      if (id && !processedIds.has(id)) {
        processedIds.add(id);
        newElements.push(el);
      }
    });

    // 2. 执行处理回调
    if (newElements.length > 0) {
      console.log(`[处理] 发现 ${newElements.length} 个新条目`);
      await callback(newElements);
      stopCount = 0;
    }

    // 3. 执行平滑滚动
    const currentHeight = document.body.scrollHeight;
    const currentPos = window.innerHeight + window.scrollY;

    // 计算剩余距离并平滑滚动
    const distanceToBottom = currentHeight - currentPos;
    window.scrollBy({
      top: distanceToBottom,
      behavior: 'smooth'
    });

    // 4. 停止条件判断
    // 在平滑滚动模式下，判断逻辑需要稍微宽松一点 (容差 50px)
    if (currentHeight <= lastScrollHeight && currentPos >= currentHeight - 50) {
      stopCount++;
      if (stopCount >= 3) {
        console.log(">> 页面已到底，停止任务。");
        clearInterval(timer);
        processedIds.clear();
      }
    } else {
      lastScrollHeight = currentHeight;
      stopCount = 0;
    }
  }, interval);
}