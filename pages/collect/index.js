Page({
  data: {
    tabs: [
      {
        id: 0,
        value: "店铺收藏",
        isActive: true
      },
      {
        id: 1,
        value: "商品收藏",
        isActive: false
      },
      {
        id: 2,
        value: "关注商品",
        isActive: false
      },
      {
        id: 3,
        value: "浏览足迹",
        isActive: false
      }
    ],
    collectList: []
  },
  onLoad: function (options) {
    let { id } = options
    let tabs = this.data.tabs
    let collectList = wx.getStorageSync("collect") || []
    tabs.forEach(v => v.id === Number(id) ? v.isActive = true : v.isActive = false)
    console.log(collectList)
    this.setData({
      tabs,
      collectList
    })
  },
  handleItemTap(e) {
    let { index } = e.detail
    let tabs = this.data.tabs
    tabs.forEach(v => v.id === index ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
  }
})