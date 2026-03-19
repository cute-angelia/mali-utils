export const trim = (str) => str.trim();

trim.start = (str) => str.trimStart();
trim.end = (str) => str.trimEnd();
trim.normalizeWhitespace = (str) => str.trim().replace(/\s+/g, ' ');



export function randomString(len) {
  len = len || 32;
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  var maxPos = $chars.length;
  var pwd = '';
  for (var i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

// ===== 生成唯一uuid =====
function randomStringUUID() {
  // E.g. 8 * 32 = 256 bits token
  var randomPool = new Uint8Array(32)
  crypto.getRandomValues(randomPool)
  var hex = ''
  for (var i = 0; i < randomPool.length; ++i) {
    hex += randomPool[i].toString(16)
  }
  // E.g. db18458e2782b2b77e36769c569e263a53885a9944dd0a861e5064eac16f1a
  return hex
}


export function isJson(str) {
  try {
    if (typeof JSON.parse(str) == "object") {
      return true
    }
  } catch (error) { }
  return false
}