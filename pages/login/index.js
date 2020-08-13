Page({
  data: {

  },
  onLoad: function (options) {

  },
  getUserInfo(e) {
    let { userInfo } = e.detail
    wx.setStorageSync("userInfo", userInfo)
    wx.navigateBack({
      delta: 1
    })
  }
})