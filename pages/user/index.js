Page({
  data: {
    userInfo: {},
    collectNum: 0
  },
  onShow: function (options) {
    let userInfo = wx.getStorageSync("userInfo")
    let collect = wx.getStorageSync("collect")
    this.setData({
      userInfo,
      collectNum: collect.length
    })
  },
})