// import { getSetting, openSetting, chooseAddress, showModal, showToast } from "../../utils/asyncWx"
Page({
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },
  // 每次打开
  onShow() {
    // 查看本地缓存中是否有收获地址数据
    let address = wx.getStorageSync("address") || {}
    // 拿到本地缓存中是否有购物车数据
    let cart = wx.getStorageSync("cart") || []
    cart = cart.filter(v => v.checked)
    // 计算总价格
    let totalPrice = 0
    // 计算购买总数量
    let totalNum = 0
    cart.forEach(v => {
      totalPrice += v.num * v.goods_price
      totalNum += v.num
    })
    // 将数据设置在当前数据中
    this.setData({
      address,
      cart,
      totalNum,
      totalPrice
    })
  }
})