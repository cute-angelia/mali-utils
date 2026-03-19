import Swal from 'sweetalert2';

// 基础配置混入
const BaseToast = Swal.mixin({
  position: 'top',
  timer: 2500,
  showConfirmButton: false,
  toast: true, // 侧边栏建议开启 toast 模式，视觉上更轻量
  width: '90%',
});

export const notify = {
  /**
   * 成功提示
   * @param {string} title 标题
   * @param {string} msg 详细内容
   */
  success(title, msg = '') {
    return BaseToast.fire({
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
    return BaseToast.fire({
      title: title,
      text: msg,
      icon: 'error',
      timer: 3500,
      iconColor: '#ef4444', // 红色提示
      background: '#fff5f5', // 浅红背景
    });
  }
};