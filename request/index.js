let ajaxTime = 0
export const request = function (url, params) {
  // 发一次请求自增
  ajaxTime++
  // 开启wx的加载框
  wx.showLoading({
    title: "加载中",
    mask: true
  })

  let baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + url,
      ...params,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
      complete() {
        // 每次请求自减
        ajaxTime--
        // 当所有的请求完成了
        if (ajaxTime <= 0) {
          // 关闭wx的加载框
          wx.hideLoading()
        }
      }
    });
  })
}