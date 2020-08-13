import { request } from '../../request/index'
Page({
  data: {
    categoryList: [],
    leftCategoryList: [],
    rightCategoryList: [],
    currentIndex: 0,
    scrollTop: 0
  },
  onLoad(options) {
    // 先判断本地存储中有没有旧的数据
    // 没有旧的数据 直接发送请求
    // 如果有旧数据 同时 旧数据没有过期 就使用 本地存储的旧数据即可

    // 1.先获取本地存储数据
    let cates = wx.getStorageSync("cates")
    // 2.判断是否有数据
    if (!cates) {
      // 没有,则发送请求
      this.getCategoryList()
    } else {
      // 有旧数据 定义过期时间 10s
      if (Date.now() - cates.time > 10 * 1000) {
        // 超过过期时间了,需要重新发送请求
        this.getCategoryList()
      } else {
        // 没超过过期时间,就使用旧数据
        this.setData({
          categoryList: cates.message,
          leftCategoryList: cates.message.map(v => v.cat_name),
          rightCategoryList: cates.message[0].children
        })
      }
    }
  },
  // 获取分类数据
  async getCategoryList() {
    let url = '/categories'
    let res = await request(url)
    let { meta: { status }, message } = res.data
    if (status === 200) {
      // 将数据保存到本地存储中
      wx.setStorageSync("cates", { time: Date.now(), message })
      this.setData({
        categoryList: message,
        leftCategoryList: message.map(v => v.cat_name),
        rightCategoryList: message[0].children
      })
    }
  },
  // 触发事件
  handleTap(e) {
    let index = e.currentTarget.dataset["index"]
    // console.log(this.data.currentIndex)
    if (this.data.currentIndex === index) {
      return
    }
    console.log(index)
    this.setData({
      rightCategoryList: this.data.categoryList[index].children,
      currentIndex: index,
      // 重新设置 右侧内容的scroll-view标签的距离顶部的距离
      scrollTop: 0
    })
  }
})