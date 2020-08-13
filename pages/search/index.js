import { request } from '../../request/index'
Page({
  data: {
    goods: [],
    query: ""
  },
  timeId: -1,
  handleInput(e) {
    // 获取搜索框中的内容
    let { value } = e.detail
    // 若是为空,则直接return
    if (!value.trim()) {
      this.setData({
        goods: []
      })
      return
    }
    // 清理定时器
    clearTimeout(this.timeId)
    // 开启定时器
    this.timeId = setTimeout(() => {
      // 准备发送请求
      this.querySearch(value)
    }, 1000)
  },
  // 根据关键字发送请求,获取数据
  async querySearch(query) {
    let url = "/goods/qsearch"
    let params = {
      data: {
        query
      }
    }
    let res = await request(url, params)
    let { meta: { status }, message } = res.data
    console.log(res)
    if (status === 200) {
      this.setData({
        goods: message
      })
    }
  },
  // 取消搜索
  handleTapCancel() {
    this.setData({
      goods: [],
      query: ""
    })
  }
})