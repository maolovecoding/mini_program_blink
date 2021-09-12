// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res.code);
        wx.request({
          url: 'http://localhost:3000/v1/token',
          method: "POST",
          data: {
            type: 100,
            account: res.code
          },
          success: (res) => {
            console.log(res);
            // 令牌写入缓存
            if (res.statusCode === 200) {
              wx.setStorageSync('token', res.data.token);
            }
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
