// login.js

var app = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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
  formSubmit: function(e) {
    wx.showLoading({
      title: '正在登陆ing~',
      mark: false
    })
    console.log(app.nicename)
    console.log(app.gender),
      console.log(app.url)
    var value = e.detail.value;
    var username = value.username;
    var password = value.password;

    wx.request({
      url: 'https://www.gxfwz36524.com/bbs/public/index.php/api/index/vt',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        username: username,
        password: password
      },
      success: function(e) {
        console.log(e)
        if (e.data == "True") {
          app.schoolnum=username
          wx.switchTab({
            url: '/pages/index/index',
          })

        } else {

          wx.showModal({
            content: '账号/密码错误',
            showCancel: false
          })
          wx.hideLoading()
        }
      }

    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})