Page({
  data: {
    tabs: [
      {
        id: 1,
        value: "全部",
        isActive: true
      },
      {
        id: 2,
        value: "待付款",
        isActive: false
      },
      {
        id: 3,
        value: "代发货",
        isActive: false
      },
      {
        id: 4,
        value: "退款/退货",
        isActive: false
      }
    ]
  },
  onLoad(options) {
    let { type } = options
    let tabs = this.data.tabs
    tabs.forEach(v => v.id === Number(type) ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
  },
  handleItemTap(e) {
    let { index } = e.detail
    let tabs = this.data.tabs
    tabs.forEach(v => v.id - 1 === index ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
  }
})