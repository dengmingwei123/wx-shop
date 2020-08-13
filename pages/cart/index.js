import { getSetting, openSetting, chooseAddress, showModal, showToast } from "../../utils/asyncWx"
Page({
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  // 每次打开
  onShow() {
    // 查看本地缓存中是否有收获地址数据
    let address = wx.getStorageSync("address") || {}
    // 拿到本地缓存中是否有购物车数据
    let cart = wx.getStorageSync("cart") || []
    // 是否全选中
    this.isAllChecked(cart)
    // 计算总价格
    this.computedTotalPrice(cart)
    // 计算购买总数量
    this.getTotal()
    // 将数据设置在当前数据中
    this.setData({
      address,
      cart
    })
  },
  // 获取收获地址
  async getAddress() {

    // wx.getSetting({
    //   success(result) {
    //     const ScopeAddress = result.authSetting["scope.address"]
    //     // 当scopeAddress等于true或undefined,调用获取地址方法
    //     if (ScopeAddress === true || ScopeAddress === undefined) {
    //       wx.chooseAddress({
    //         success(result1) {
    //           console.log(result1)
    //         }
    //       })
    //     } else {
    //       // 否则,调用开启权限设置方法
    //       wx.openSetting({
    //         success(result2) {
    //           console.log(result2)
    //           // 开启后,调用获取地址方法
    //           wx.chooseAddress({
    //             success(result3) {
    //               console.log(result3)
    //             }
    //           })
    //         }
    //       })
    //     }
    //   }
    // })

    try {
      // 获取当前状态
      let res = await getSetting()
      let scopeAddress = res.authSetting["scope.address"]
      // 当ScopeAddress等于false的时候,就是用户拒绝了权限获取,需要重新打开'
      if (scopeAddress === false) {
        openSetting()
      }
      let address = await chooseAddress()
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
      console.log(address.all)
      // 将获取到的地址保存到本地存储中
      wx.setStorageSync("address", address)
    } catch (err) {
      console.log(err)
    }
  },
  // 更改选中
  handleChecked(e) {
    // 获取缓存数据
    let cart = wx.getStorageSync("cart") || []
    let { index } = e.currentTarget.dataset
    let { value } = e.detail
    if (typeof (value[0]) === "string") {
      cart[index].checked = true
    } else {
      cart[index].checked = false
    }
    // 重新提交缓存
    wx.setStorageSync("cart", cart)
    // 是否全选中
    this.isAllChecked(cart)
    // 计算总价格
    this.computedTotalPrice(cart)
    // 计算购买总数量
    this.getTotal()
  },
  // 是否全选中
  isAllChecked(cart) {
    let allChecked = false
    // 获取是否全选中
    let isAllChecked = cart.filter(v => v.checked)
    if (isAllChecked.length === cart.length && cart.length !== 0) {
      allChecked = true
    }
    this.setData({
      allChecked
    })
  },
  // 全选反选
  handleAllChecked(e) {
    let cart = wx.getStorageSync("cart") || []
    let { value } = e.detail
    if (typeof (value[0]) === "string") {
      cart.forEach(v => v.checked = true)
    } else {
      cart.forEach(v => v.checked = false)
    }
    wx.setStorageSync("cart", cart)
    this.setData({
      cart
    })
    // 计算总价格
    this.computedTotalPrice(cart)
    // 计算购买总数量
    this.getTotal()
  },
  // 计算总价格
  computedTotalPrice(cart) {
    let totalPrice = 0
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price
      }
    })
    this.setData({
      totalPrice
    })
  },
  // 增加减少数量
  async handleCount(e) {
    let { count, index } = e.currentTarget.dataset
    let cart = wx.getStorageSync("cart") || []
    // 若是小于等于0,是否删除该物品
    if (cart[index].num <= 1 && Number(count) === -1) {
      let result = await showModal({ title: "温馨提示", content: "是否删除该商品" })
      if (result.confirm) {
        // 确定
        cart.splice(index, 1)
      }
    } else {
      cart[index].num += Number(count)
    }
    wx.setStorageSync("cart", cart)
    this.setData({
      cart
    })
    this.isAllChecked(cart)
    this.computedTotalPrice(cart)
    this.getTotal()
  },
  // 获取购买总数量
  getTotal() {
    let cart = wx.getStorageSync('cart') || []
    let totalNum = 0
    cart.forEach(v => {
      if (v.checked) {
        totalNum += v.num
      }
    })
    this.setData({
      totalNum
    })
  },
  // 结算
  async handlePay() {
    let { address, totalNum } = this.data
    // 1.需要判断,是否有收货地址
    if (!address.userName) {
      // 没有,则需要弹窗提示,并return
      await showToast({ title: "请填写收货地址" })
      return
    }
    // 2.需要判断,是否有选中的商品
    if (totalNum <= 0) {
      // 没有,则需要弹窗提示,并return
      await showToast({ title: "请选择需要购买的商品" })
      return
    }
    // 3.跳转到支付页面
    wx.navigateTo({
      url: "/pages/pay/index"
    })
  }
})