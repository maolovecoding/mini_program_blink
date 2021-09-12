// pages/my/my.js
import BookModel from "../../models/book";
import ClassicModel from "../../models/classic";
const bookModel = new BookModel();
const classicModel = new ClassicModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 是否授权
    authorized: false,
    userInfo: {},
    bookCount: 0,
    classics: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 该方法，只有在用户已经授权过的情况下，才能拿到用户信息
    // wx.getUserInfo({
    //   lang: "zh_CN",
    //   success(res) {
    //     console.log(res);
    //   }
    // })
    this.userAuthorized();
    // 获取喜欢的书籍数量
    this.getMyBookCount();
    this.getMyFavor();
  },
  /**
   * 用户是否授权
   */
  userAuthorized() {
    // 获取到用户是否授权
    wx.getSetting({
      withSubscriptions: true,
      success: data => {
        // scope.userInfo: true 表明授权了
        // 也就是 data.authSetting['scope.userInfo'] = true
        console.log(data.authSetting["scope.userInfo"]);
        if (data.authSetting["scope.userInfo"]) {
          wx.getUserInfo({
            lang: "zh_CN",
            success: res => {
              // console.log(res);
              // 用户授权了
              this.setData({
                authorized: true,
                userInfo: res.userInfo
              });
            }
          })
        }
      }
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
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo;
    console.log(userInfo);
    this.setData({
      userInfo,
      authorized: true
    })
  },
  onJumpToAbout(event) {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  onStudy(event) {
    wx.navigateTo({
      url: '/pages/course/course',
    })
  },
  getMyBookCount() {
    bookModel.getMyBookCount().then(res => {
      this.setData({
        bookCount: res.count
      })
    })
  },
  getMyFavor() {
    classicModel.getMyFavor((res) => {
      this.setData({
        classics: res
      })
      // console.log(res);
    })
  }
})