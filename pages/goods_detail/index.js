import { request } from "../../request/index"
import { showToast } from "../../utils/asyncWx"
Page({
  data: {
    goodsDetail: {},
    isCollect: false,
    throttle: true
  },
  onLoad: function (options) {
    let { goods_id } = options
    this.getGoodsDetail(goods_id)
  },
  // 获取商品详情数据
  async getGoodsDetail(goods_id) {
    let url = "/goods/detail"
    let params = {
      data: {
        goods_id
      }
    }
    let res = await request(url, params)
    let { meta: { status }, message } = res.data
    if (status === 200) {
      let goodsDetail = {
        goods_id: message.goods_id,
        goods_name: message.goods_name,
        goods_price: message.goods_price,
        goods_introduce: message.goods_introduce.replace(/.webp/g, '.jpg'),
        pics: message.pics
      }
      this.setData({
        goodsDetail
      })
      this.isCurrentCollect()
    }
  },
  // 点击轮播图,放大预览
  handlePreviewImage(e) {
    let { index } = e.currentTarget.dataset
    console.log(index)
    let urls = this.data.goodsDetail["pics"].map(v => v.pics_mid)
    wx.previewImage({
      current: urls[index],
      urls
    });
  },
  // 将商品加入购物车
  handleAddCart() {
    // 从缓存中取得数据
    let cart = wx.getStorageSync("cart") || []
    let goodsDetail = this.data.goodsDetail
    let index = cart.findIndex(v => v.goods_id === goodsDetail.goods_id)
    // 如果之前添加了,那就数量++
    if (index >= 0) {
      cart[index].num++
    } else {
      // 否则加入,并且数量为1
      goodsDetail.num = 1
      goodsDetail.checked = true
      cart.push(goodsDetail)
    }
    // 将数据添加缓存
    wx.setStorageSync("cart", cart)
    wx.showToast({
      title: '加入成功',
      icon: 'none'
    });
  },
  // 将商品加入收藏
  handleCollect() {
    let throttle = this.data.throttle
    // 节流阀
    if (!throttle) {
      return
    }
    this.setData({
      throttle: false
    })
    // 获取本地存储中的收藏数据
    let collect = wx.getStorageSync("collect") || []
    let goodsDetail = this.data.goodsDetail
    // 判断当前的商品是否已经在本地存储中
    let index = collect.findIndex(v => v.goods_id === goodsDetail.goods_id)
    // 如果有,则删除
    if (index >= 0) {
      collect.splice(index, 1)
    } else {
      // 没有则添加
      collect.push(goodsDetail)
    }
    // 将数据添加到本地缓存中
    wx.setStorageSync("collect", collect)
    // 判断商品是否收藏
    this.isCurrentCollect()
    // 弹窗提示
    let title = ""
    if (this.data.isCollect) {
      title = "收藏成功"
    } else {
      title = "取消收藏"
    }
    showToast({ title })
    setTimeout(() => {
      this.setData({
        throttle: true
      })
    }, 2000)
  },
  // 判断当前商品是否收藏了
  isCurrentCollect() {
    let collect = wx.getStorageSync("collect") || []
    let goodsDetail = this.data.goodsDetail
    let index = collect.findIndex(v => v.goods_id === goodsDetail.goods_id)
    let isCollect = false
    // 如果收藏了
    if (index >= 0) {
      isCollect = true
    } else {
      isCollect = false
    }
    this.setData({
      isCollect
    })
  }
})