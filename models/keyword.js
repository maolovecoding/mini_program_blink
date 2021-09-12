import Http from "../utils/http-promise.js"
export default class KeywordModel extends Http {
  /**
   * 返回缓存中的键名
   */
  get _key() {
    return "keyword";
  }
  /**
   * @return {Number} 缓存数组的最大长度
   */
  get _maxLength() {
    return 10;
  }
  /**
   * @return {Array} 返回缓存中的历史 数组类型
   */
  getHistory() {
    const keywords = wx.getStorageSync(this._key);
    return keywords ? keywords : [];
  }
  /**
   * 获取热门关键词
   * @return {Promise} 
   */
  getHot() {
    return this.request({
      url: "book/hot_keyword"
    })
  }
  /**
   * 将关键字写入缓存中
   * @param {String} keyword 关键字
   */
  addToHistory(keyword) {
    const keywords = this.getHistory();
    const has = keywords.includes(keyword);
    if (!has) {
      // 插入到头部
      keywords.unshift(keyword);
      // 如果长度过长，删除最后一个元素
      if (keywords.length > this._maxLength) {
        keywords.pop();
      }
      // 覆盖数组
      wx.setStorage({
        data: keywords,
        key: this._key,
      })
    }

  }
}