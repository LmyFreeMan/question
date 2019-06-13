// pages/filling.js
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
    console.log(options)
    this.data.question=JSON.parse(options.data)
    var lens=Object.keys(this.data.question[0].option).length
    this.data.len=this.data.question.length;
    console.log(this.data.question)
   this.setData({
     question:JSON.parse(options.data),
     len:lens
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