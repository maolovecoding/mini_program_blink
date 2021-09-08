// 点赞 取消点赞的请求

import Http from "../utils/http.js";
/**
 * 进行发送 点赞 和 取消点赞的请求类
 */
class LikeModel extends Http {
  /**
   * 行为请求
   * @param {*} behavior 点赞 还是取消点赞
   * @param {*} artId 文章Id
   * @param {*} category 点赞类型 这里不用type，因为是保留关键字
   */
  like(behavior, artId, category) {
    // console.log(artId,category);
    this.request({
      // 点赞 or 取消点赞
      url: behavior === "like" ? "like" : "like/cancel",
      method: "POST",
      data: {
        // 文章
        "art_id": artId,
        // 点赞类型
        "type": category
      }
    })
  }
  /**
   * 获取点赞状态
   * @param {Number} artId 文章Id
   * @param {Number} category 点赞类型 这里不用type，因为是保留关键字
   * @param {Function} callback 回调函数
   */
  getClassicLikeStatus(artId, category, callback) {
    this.request({
      url: `classic/${category}/${artId}/favor`,
      success: callback
    })
  }
}

export default LikeModel;