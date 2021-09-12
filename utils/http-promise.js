import { baseUrl, appkey } from "../config/config.js"
// 提示码
const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效，请前往www.7yue.pro申请',
  3000: '期刊不存在'
}

// 封装请求
/**
 * 进行发起网络请求的静态类
 */
class Http {
  request({ url, data = {}, method = "GET" }) {
    return new Promise((resolve, reject) => {
      this._request({ url, resolve, reject, method, data });
    })
  }
  /**
   * 默认请求方式 GET
   * @param url 必传
   */
  _request({ url, resolve, reject, method = "GET", data = {} }) {
    wx.request({
      url: baseUrl + url,
      method,
      header: {
        appkey,
        "content-type": "application/json"
      },
      data,
      /**
       * 请求成功回调函数
       * @param {*} res 
       */
      success: (res) => {
        const code = res.statusCode.toString();
        // 以二开头 成功状态码
        if (code.startsWith("2")) {
          // 直接返回实际数据
          resolve(res.data);
        } else {
          reject();
          // 异常处理
          // 提示请求失败
          this._show_error(res.data.error_code);
        }
      },
      /**
       * 请求失败回调函数
       * @param {*} err 
       */
      fail: (err) => {
        reject();
        // 异常处理
        // 提示请求失败
        this._show_error(1);
      }
    })
  }
  /**
   * 私有方法，展示错误用
   * @param {*} error_code 
   */
  _show_error(error_code = 1) {
    wx.showToast({
      title: tips[error_code],
      icon: "none",
      // 显示时间
      duration: 2000
    })
  }
}
export default Http;