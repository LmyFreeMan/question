var app = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    schoolnum: '',
  },
  onShareAppMessage: function() {
    return {
      title: '大唐杯练习题',
      desc: '祝你取得好成绩',
      path: '/pages/index/index',
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {
        console.log(res)
      }
    };
  },
  onLoad: function() {

  },
  pay() {
    let that = this
    wx.previewImage({
      urls: ["https://www.gxfwz36524.com/img/zan.png"],
    })
    console.log('payPreview success')
  },

  copy() {
    let that = this
    wx.setClipboardData({
      data: '859578552',
      success() {
        console.log('success'),
          wx.showToast({
            title: '您已成功复制QQ交流群号，请移步到QQ内搜索',
            icon:'none',
            duration: 3000
          })
      }
    })
    wx.getClipboardData({
      success(res) {
        console.log(res.data)
      }
    })
  },
  avatar() {
    wx.navigateTo({
      url: '/pages/core/userCtr/userCtr',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
   this.setData({
     name:app.nicename,
     url:app.url
   })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})