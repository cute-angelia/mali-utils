import Swal from 'sweetalert2';

// 基础配置混入
let _baseToast;
const getBaseToast = () => {
  if (!_baseToast) {
    _baseToast = Swal.mixin({
      position: 'top',
      timer: 2500,
      showConfirmButton: false,
      toast: true,
      width: '90%',
    });
  }
  return _baseToast;
};

// sweetalert2 notifications
export const notifySwal = {
  /**
   * 成功提示
   * @param {string} title 标题
   * @param {string} msg 详细内容
   */
  success(title, msg = '') {
    return getBaseToast().fire({
      title: title,
      text: msg,
      icon: 'success',
      iconColor: '#10b981', // 你的绿色系
      background: '#f0fff4', // 浅绿背景
    });
  },

  /**
   * 失败提示
   * @param {string} title 标题
   * @param {string} msg 错误详细内容
   */
  error(title, msg = '') {
    return getBaseToast().fire({
      title: title,
      text: msg,
      icon: 'error',
      timer: 3500,
      iconColor: '#ef4444', // 红色提示
      background: '#fff5f5', // 浅红背景
    });
  }
};

// 传统的chrome通知
export function notifyChrome(title, message, icon = '/icons/icon.png') {
  try {
    var isClosed = false;
    var notificationId = "posting_" + Math.random();

    chrome.notifications.create(
      notificationId, {
      type: "basic",
      title: title,
      message: message,
      iconUrl: icon,
    },
      function (nId) { }
    );
    setTimeout(function () {
      if (!isClosed)
        chrome.notifications.clear(notificationId, function (wasCleared) { });
    }, 5000);
  } catch (e) {
    alert(e.message);
  }
}