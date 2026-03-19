import { setChromeStorage, getChromeStorage } from '../../storage.js'

// 专门处理具体业务
export const handlers = {
  async GET_USER_INFO(data) {
    await setChromeStorage("userInfo", data);
    return data
  }
};
