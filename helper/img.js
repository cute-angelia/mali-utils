import b64 from "base-64"

export function urlToDataUrl(url) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      credentials: 'include',
    })
      .then(response => response.blob())
      .then(blob => new Promise((resolve2, reject2) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve2(reader.result)
        reader.onerror = reject2
        reader.readAsDataURL(blob)
      })).then((dataUrl) => {
        resolve(dataUrl)
      }).catch(e => {
        reject(e)
      })
  })
}


// dataUrl 转化
// .then((type, blob) => { var url = URL.createObjectURL(blob) }
export function dataURItoBlob(dataURI) {
  return new Promise((resolve) => {
    var byteString = b64.decode(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    var bb = new Blob([ab]);
    resolve(mimeString, bb)
  })
}

// 图片具大化
export function largeImg(imgUrl) {
  if (imgUrl) {
    // 微博
    if (imgUrl.indexOf("sinaimg.cn") > 0) {
      // https://wx3.sinaimg.cn/mw690/002C8iduly1gvbmia82psj622o340u1102.jpg
      var b = new URL(imgUrl)
      var temps = b.pathname.split('/')
      temps[1] = 'large'
      imgUrl = b.origin + "" + temps.join("/")
    }
    // twitter
    if (imgUrl.indexOf("twimg.com") > 0) {
      if (imgUrl.indexOf("?") > 0) {
        imgUrl = imgUrl.substring(0, imgUrl.indexOf("?"))
      }
      imgUrl = imgUrl + "?format=jpg&name=orig"
    }
  }

  return imgUrl
}


/**
 * 从 img 标签的 srcset 属性中提取所有图片 URL
 * @param {HTMLImageElement|string} element - img 元素或 srcset 字符串
 * @returns {string[]} 图片 URL 数组
 */
export function getUrlsFromSrcset(element) {
  // 获取 srcset 字符串（支持直接传入元素或字符串）
  const srcset = typeof element === 'string' ? element : element.getAttribute('srcset');

  if (!srcset) return [];

  // 逻辑：按逗号分割，然后取每一项的第一部分（即 URL）
  return srcset.split(',')
    .map(item => item.trim().split(/\s+/)[0])
    .filter(url => url !== "");
}

export function getMaxUrlFromSrcset(element) {
  const srcset = typeof element === 'string' ? element : element.getAttribute('srcset');
  if (!srcset) return null;

  const candidates = srcset.split(',')
    .map(item => {
      const [url, descriptor] = item.trim().split(/\s+/);
      // 解析维度数值（如 "1200w" -> 1200, "2x" -> 2），缺失则默认为 1
      const value = descriptor
        ? parseFloat(descriptor.replace(/[wx]/i, ''))
        : 1;
      return { url, value };
    })
    .filter(item => item.url);

  if (candidates.length === 0) return null;

  // 按数值从大到小排序
  candidates.sort((a, b) => b.value - a.value);

  return candidates[0].url;
}