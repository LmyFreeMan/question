// pages/dowok/dowork.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question:"",
    len:"",
    index:1,
    operate:"下一题",
    show:"显示答案",
    flag:false
  },
  next:function(){
    if(this.data.index==this.data.question.length)
    wx.switchTab({
      url: '../index/index',
     
    });
    this.setData({
      flag:false,
      show:"显示答案"
    })
    this.data.index=this.data.index+1
   var indexs=this.data.index;
   this.setData({
     index:indexs
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  handleClick:function(){
    console.log(this.data)
    console.log(this.data.show)
    if(this.data.show=="显示答案")
    this.setData({
      flag:true,
      show:"隐藏答案"
    })
    else
    this.setData({
      flag:false,
      show:"显示答案"
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this
    wx.request({
      url : "https://www.gxfwz36524.com/question/public/index.php/index/index/home",
      method: "POST",
      data: {
       questionSort:getApp().globalData.questionSort,
       questionType:getApp().globalData.questionType
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log("我是res")
        console.log(res)
        that.data.question=res.data
         console.log("111"+that.data.question.length)
        that.setData({
          question:res.data
        })
      },
    
    })
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