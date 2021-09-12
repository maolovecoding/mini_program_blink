// pages/book/book.js
import BookModel from "../../models/book.js";
const bookModel = new BookModel();
import { randomString } from "../../utils/common.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 热门书籍书籍列表
    bookList: [],
    // 是否展示搜索区域
    searching: false,
    // 触发页面上拉到底的事件 传递的参数
    more: String
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求获取热门书籍数据
    bookModel.getHotList().then(res => {
      console.log(res);
      this.setData({ bookList: res });
    });
  },
  goBookDetail(event) {
    // 跳转到书籍详情页，以子页面的形式
    wx.navigateTo({
      // id号携带过去
      url: '/pages/book-detail/book-detail?id=' + event.detail.id,
    });
  },
  /**
   * 搜索
   * @param {*} event 
   */
  onSearching(event) {
    this.setData({
      searching: true
    })
  },
  /**
   * 取消搜索事件
   * @param {*} event 
   */
  searchCancel(event) {
    this.setData({
      searching: false
    })
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
  onReachBottom() {
    // 触发该函数，让搜索组件加载更多的数据
    this.setData({
      more: randomString(32)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})