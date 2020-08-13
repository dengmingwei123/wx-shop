export const getSetting = function () {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success(result) {
        resolve(result)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

export const openSetting = function (fnc) {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success(result) {
        resolve(result)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

export const chooseAddress = function () {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success(result) {
        resolve(result)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

export const showModal = function ({ title, content }) {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '温馨提示',
      content: '是否要删除该商品',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        resolve(result)
      }
    })
  })
}

export const showToast = function ({ title }) {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: title,
      icon: 'none',
      mask: false,
      success: (result) => {
        resolve(result)
      }
    });

  })
}

export const chooseImage = function () {
  return new Promise((resolve, reject) => {
    // 调用小程序的内置选择图片api
    wx.chooseImage({
      // 同时选中的最大数量
      count: 9,
      // 图片格式 原图 压缩
      sizeType: ["original", "compressed"],
      // 图片来源 相册 相机
      sourceType: ["album", "camera"],
      success(result) {
        resolve(result)
      }
    })
  })
}

export const uploadFile = function (src) {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      // 图片要上传到哪里
      url: "https://img.coolcr.cn/api/upload",
      // 被上传的文件路径
      filePath: src,
      // 上传文件的名称,后台获取文件需要用的
      name: "image",
      // 顺带的文本信息
      formData: {},
      success(result) {
        resolve(result)
      }
    })
  })
}