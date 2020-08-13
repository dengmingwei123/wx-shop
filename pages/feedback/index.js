import { chooseImage, showToast, uploadFile } from "../../utils/asyncWx"
Page({
  data: {
    tabs: [
      {
        id: 0,
        value: "体验问题",
        isActive: true
      },
      {
        id: 1,
        value: "商品、商家投诉",
        isActive: false
      }
    ],
    // 被选中图片路径数组
    chooseImgs: [],
    // 文本域的内容
    textValue: ""
  },
  upLoadImgs: [],
  onLoad: function (options) {

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
  // 点击"+"选择图片
  async handleChooseItem() {
    let chooseImgs = this.data.chooseImgs
    let res = await chooseImage()
    let { tempFilePaths } = res
    chooseImgs = chooseImgs.concat(tempFilePaths)
    this.setData({
      chooseImgs
    })
  },
  // 删除图片
  closeImg(params) {
    let { src } = params.detail
    let chooseImgs = this.data.chooseImgs
    let index = chooseImgs.findIndex(v => v === src)
    console.log(index)
    chooseImgs.splice(index, 1)
    this.setData({
      chooseImgs
    })
  },
  // 文本域的输入事件
  handleTextValue(e) {
    let { value } = e.detail
    this.setData({
      textValue: value
    })
  },
  // 提交按钮的点击事件
  handleFormSubmit() {
    let { textValue, chooseImgs } = this.data
    if (!textValue.trim()) {
      showToast({ title: "请输入文本框的值" })
      return
    }
    if (chooseImgs.length <= 0) {
      showToast({ title: "请选择图片" })
      return
    }

    // 正在上传中
    wx.showLoading({
      title: "正在上传中",
      mask: true
    })
    // 准备上传图片,到专门的服务器
    // 上传文件的api不支持多个文件上传,需要挨个上传
    chooseImgs.forEach(async (v, i) => {
      let res = await uploadFile(v)
      let { statusCode } = res
      if (statusCode === 200) {
        let { url } = JSON.parse(res.data).data
        this.upLoadImgs.push(url)
        // 所有图片上传完毕,触发的代码
        if (i === chooseImgs.length - 1) {
          console.log("把文本内容和外网的图片数组 提交到后台中")
          // 提交都成功,重置页面,返回上一页
          this.setData({
            textValue: "",
            chooseImgs: []
          })
          wx.navigateBack({
            delta: 1
          })
          wx.hideLoading()
        }
      }
    })

  }
})