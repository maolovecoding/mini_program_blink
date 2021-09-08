// pages/classis/classic.js
import ClassicModel from "../../models/classic.js"
import LikeModel from "../../models/like.js"
// 发起网络请求的类
// 实例化
const classicModel = new ClassicModel();
const likeModel = new LikeModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 数据 默认是空对象
    classic: {},
    // 是否最新的期刊
    latest: true,
    // 是否是第一篇期刊
    first: false,
    // 喜欢的数量
    likeCount: 0,
    // 点赞状态
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest(res => {
      // 数据绑定(更新)
      // console.log(res);
      this.setData({
        classic: res,
        // 初始化文章点赞状态
        likeStatus: res.like_status,
        likeCount: res.fav_nums
      });
      // latestClassic 最新期刊 包含的有最新期刊号
    });
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 监听组件的like事件的回调函数 点赞/取消点赞
   * @param {*} event 
   */
  onLike(event) {
    // 拿到点赞还是取消点赞的行为
    const behavior = event.detail.behavior;
    // console.log(behavior);
    // console.log(event);
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type);
  },
  /**
   * 左按钮 回调函数处理 获取下一期(靠近最新的期刊)
   * @param {*} event 
   */
  onNext(event) {
    this._updateClassic("next");
  },
  /**
   * 右按钮 回调函数处理 获取上一期
   * @param {*} event 
   */
  onPrevious(event) {
    // 发起请求
    this._updateClassic();
  },
  /**
   * 发起请求 获取期刊
   * @param {*} nextOrPrevious 上一期还是下一期，默认上一期（更靠近往期期刊）
   */
  _updateClassic(nextOrPrevious = "previous") {

    /**
     * index就是当前期刊的序号
     */
    classicModel.getClassic(this.data.classic.index, nextOrPrevious, (res) => {
      // console.log(res);
      // 更新文章点赞状态
      this._getLikeStatus(res.id, res.type);
      // 更新数据
      this.setData({
        classic: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },
  /**
   * 获取点赞状态
   * @param {Number} artId 文章id
   * @param {Number} category 点赞类型
   */
  _getLikeStatus(artId, category) {
    likeModel.getClassicLikeStatus(artId, category, (res) => {
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  }

})
