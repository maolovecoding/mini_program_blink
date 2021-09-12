// pages/book-detail/book-detail.js
import BookModel from "../../models/book.js"
import LikeModel from "../../models/like.js"
const bookModel = new BookModel();
const likeModel = new LikeModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 书籍详情
    bookDetail: {},
    // 短评
    comments: [],
    // 点赞状态
    likeStatus: false,
    // 喜欢的人数
    likeCount: 0,
    // 是否打开了真正的评论输入框
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    // 提示用户正在加载数据
    wx.showLoading();

    // 获取传递进来的书籍id
    const bookId = options.id;
    // 初始化书籍详情，短评，点赞信息
    this._initBookInfo(bookId);
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
   * 点赞事件
   * @param {Event} event 
   */
  onLike(event) {
    likeModel.like(event.detail.behavior, this.data.bookDetail.id, 400);
  },
  /**
   * 打开评论功能
   * @param {*} event 
   */
  onFakePost(event) {
    this.setData({
      posting: true
    })
  },
  /**
   * 隐藏评论功能
   * @param {*} event 
   */
  onCancel(event) {
    this.setData({
      posting: false
    })
  },
  /**
   * 增加短评
   * @param {*} event 
   */
  onPostShortComment(event) {
    // 获取组件传递出来的内容
    // const comment = event.detail.text;
    // 获取输入框的文本内容
    // const commentInput = event.detail.value;

    const comment = event.detail.text || event.detail.value;

    // console.log(comment);

    // 短评字数限制
    this._checkCommentLength(comment);
    // 发起请求增加短评
    bookModel.addBookShortComment({
      book_id: this.data.bookDetail.id,
      content: comment
    }).then((res) => {
      // 提示添加短评成功
      wx.showToast({
        title: '+1',
      })
      // 然后将每次添加的短评放在上面展示的短评的第一位
      this.data.comments.unshift({
        // 暂时展示短评的数据量为1
        content: comment,
        nums: 1
      })
      this.setData({
        comments: this.data.comments
      });
      // 手动触发取消，取消遮罩
      this.setData({
        posting: false
      })
    })
  },
  _checkCommentLength(comment) {
    // 短评字数为0
    if (!comment) return;
    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: "none"
      })
      return;
    }
  },

  _initBookInfo(bookId) {
    const getBookDetail = bookModel.getBookDetail(bookId);
    const getComments = bookModel.getBookComments(bookId);
    const getLikeStatus = bookModel.getBookLikeStatus(bookId);
    Promise.all([getBookDetail, getComments, getLikeStatus])
      .then((res) => {
        // 返回值res就是一个数组，传递到all的参数数组有几个元素
        // res这个返回值数组就有几个元素
        this.setData({
          bookDetail: res[0],
          comments: res[1].comments,
          likeStatus: res[2].like_status,
          likeCount: res[2].fav_nums
        })
        // 隐藏加载中的提示框
        wx.hideLoading();
      })

    // 发起请求获取书籍详情数据
    // bookModel.getBookDetail(bookId).then(res => {
    //   // console.log(res);
    //   this.setData({
    //     bookDetail: res
    //   })
    // });
    // bookModel.getBookComments(bookId).then(res => {
    //   // console.log(res);
    //   this.setData({
    //     comments: res.comments
    //   })
    // });
    // bookModel.getBookLikeStatus(bookId).then(res => {
    //   // console.log(res);
    //   this.setData({
    //     likeStatus: res.like_status,
    //     likeCount: res.fav_nums
    //   })
    // });
  }
})