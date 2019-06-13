// find.js

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
  onLoad: function(options) {

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
    var that=this
  wx.request({
    url : "https://www.gxfwz36524.com/question/public/index.php/index/index/getwrong",
    method: "POST",
    data:{
      openid:app.openid
    },
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    success: function (res) {
     
     that.setData({
      lists:res.data
     })
    },
  
  })

  },
  go: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../again/again?id=' + e.currentTarget.dataset.id,
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