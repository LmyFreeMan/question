// pages/again/again.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: "显示答案"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   console.log(options)
    var that = this
    wx.request({
      url: "https://www.gxfwz36524.com/question/public/index.php/index/index/wrong",
      method: "POST",
      data: {
        id:options.id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data[0].questionE=="")
        console.log(res.data[0].questionE == "")
        console.log(res.data[0].questionG== "")
       for(var i=0;i<3;i++)
       {
         if (res.data[0].questionE == "")
           res.data[0].questionE = null;
         else if (res.data[0].questionF == "")
           res.data[0].questionF = null;
         else
           res.data[0].questionG = null;
       }
        console.log("dddd")
        console.log(res)
        that.setData({
          lists: res.data
        })
      },

    })




  },
  handleClick: function () {
    console.log(this.data)
    console.log(this.data.show)
    if (this.data.show == "显示答案")
      this.setData({
        flag: true,
        show: "隐藏答案"
      })
    else
      this.setData({
        flag: false,
        show: "显示答案"
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})