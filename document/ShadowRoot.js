
export function ShadowRootQuerySelectorAll(selector, root = document) {
  let results = Array.from(root.querySelectorAll(selector));

  // 查找当前层级下所有带有 ShadowRoot 的元素
  const hosts = root.querySelectorAll('*');
  for (const el of hosts) {
    if (el.shadowRoot) {
      // 递归进入 ShadowRoot 继续搜索
      results = results.concat(ShadowRootQuerySelectorAll(selector, el.shadowRoot));
    }
  }
  return results;
}


// Shadow Root css
export function ShadowRootAddShadowRootCss(inode, css) {
  inode.innerHTML += `<style>${css}</style>`
}

