import { request } from '../../request/index'
Page({
  data: {
    // 轮播图列表
    swiperList: [],
    // 导航分类列表
    categoriesList: [],
    // 楼层列表
    floorList: []
  },
  onLoad() {
    this.getSwiperList()
    this.getCategoriesList()
    this.getFloorList()
  },
  // 获取轮播图数据
  async getSwiperList() {
    let url = '/home/swiperdata'
    let res = await request(url)
    let { meta: { status }, message } = res.data
    if (status === 200) {
      this.setData({
        swiperList: message
      })
    }
  },
  // 获取分类导航数据
  async getCategoriesList() {
    let url = '/home/catitems'
    let res = await request(url)
    let { meta: { status }, message } = res.data
    if (status === 200) {
      this.setData({
        categoriesList: message
      })
    }
  },
  // 获取楼层数据
  async getFloorList() {
    let url = '/home/floordata'
    let res = await request(url)
    let { meta: { status }, message } = res.data
    if (status === 200) {
      let floorList = this.formatFloorList(message)
      this.setData({
        floorList
      })
    }
  },
  // 格式化数据
  formatFloorList(message) {
    let arr = []
    let string = ""
    message.forEach(v => {
      v["product_list"].forEach(v1 => {
        arr = v1.navigator_url.split("?")
        arr[0] += "/index"
        string = arr.join("?")
        v1.navigator_url = string
      })
    })
    return message
  }
});
