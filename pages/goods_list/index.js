import { request } from '../../request/index.js'
Page({
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    pagenum: 1,
    pagesize: 10,
    cid: "",
    query: "",
    goodsList: []
  },
  onLoad: function (options) {
    this.data.query = options.query || ""
    this.data.cid = options.cid || ""
    this.getGoodsList(this.data.cid, this.data.query)
  },
  // 改变tab栏的数据
  tabsItemChange(e) {
    let { index } = e.detail
    let { tabs } = this.data
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
  },
  // 获取商品列表数据
  async getGoodsList(cid, query) {
    let url = "/goods/search"
    let params = {
      data: {
        query,
        cid,
        pagenum: 1,
        pagesize: this.data.pagesize
      }
    }
    let res = await request(url, params)
    let { meta: { status }, message: { goods } } = res.data
    if (status === 200) {
      // 关闭下拉刷新窗口
      wx.stopPullDownRefresh()
      this.setData({
        pagenum: 1,
        goodsList: goods
      })
    }
  },
  // 获取下一页数据
  async getNextGoodsList() {
    let pagenum = this.data.pagenum + 1
    this.setData({
      pagenum
    })
    let url = "/goods/search"
    let params = {
      data: {
        query: "",
        cid: this.data.cid,
        pagenum: this.data.pagenum,
        pagesize: this.data.pagesize
      }
    }
    let res = await request(url, params)
    let { meta: { status }, message: { goods } } = res.data
    if (status === 200) {
      if (goods.length <= 0) {
        wx.showToast({
          title: '没有更多数据了',
          icon: 'none'
        });
        return
      }
      let goodsList = this.data.goodsList.concat(goods)
      this.setData({
        goodsList
      })
    }
    console.log(res)
  },
  // 页面上拉加载
  onReachBottom() {
    this.getNextGoodsList()
  },
  // 页面下拉刷新
  onPullDownRefresh() {
    this.getGoodsList(this.data.cid, this.data.query)
  }
})