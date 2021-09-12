import Http from "../utils/http.js"

// 继承Http类 这个类用来发送 classic 页面的相关请求，获取数据
class ClassicModel extends Http {
  getLatest(callback) {
    this.request({
      url: "classic/latest",
      success: (res) => {
        callback(res);
        // 记录当前最新的期刊编号 保存在本地
        this._setLatestIndex(res.index);
        // 将数据保存到缓存中
        const classicKey = this._getKey(res.index);
        wx.setStorage({
          data: res,
          key: classicKey,
        })
      }
    })
  }
  /**
   * 获取上一期/下一期 (获取上一期，也就是往期的期刊)
   * @param {*} callback  回调函数
   * @param nextOrPrevious 上一期 还是下一期
   * @param index 当前期刊的序号
   */
  getClassic(index, nextOrPrevious, callback) {
    // 先去缓存中查数据
    // 是去获取上一期 还是下一期期刊数据
    const classicKey = this._getKey(nextOrPrevious === "next" ? index + 1 : index - 1);
    // 去缓存中查询这个期刊数据 看是否可以找到
    wx.getStorage({
      key: classicKey,
    }).then((res) => { // 数据在res.data 里面
      // 缓存中有数据，复用 不需要发起请求
      // 直接调用回调函数即可了 有数据
      callback(res.data);
    }).catch(err => {
      // 没找到 发起请求获取数据 然后顺便把数据 写到缓存
      this.request({
        url: "classic/" + index + "/" + nextOrPrevious,
        success: (res) => {
          callback(res);
          // 数据写入缓存
          wx.
            setStorage({
              data: res,
              key: this._getKey(res.index)
            })
        }
      })
    })
  }
  /**
   * 获取喜欢
   * @param {*} success 
   */
  getMyFavor(success) {
    this.request({
      url: "classic/favor",
      success
    })
  }
  /**
   * 是否是最后的期刊
   * @param {*} index 期刊号 
   */
  isFirst(index) {
    return index === 1 ? true : false;
  }
  /**
   * 是否是最新的期刊
   * @param {*} index 期刊号 
   */
  isLatest(index) {
    return index === this._getLatestIndex() ? true : false;
  }

  // latestClassic 最新期刊 包含的有最新期刊号
  // 将数据保存到本地
  _setLatestIndex(index) {
    wx.setStorage({
      data: index,
      key: 'latest',
    });
  }

  _getLatestIndex() {
    // 读取本地的最新期刊编号
    // console.log( wx.getStorageSync('latest'));
    return wx.getStorageSync('latest');
  }
  /**
  * 该方法 用来生成缓存中保存calssic数据的key
  * @param {*} index 
  */
  _getKey(index) {
    return "classic-" + index;
  }
}
export default ClassicModel;