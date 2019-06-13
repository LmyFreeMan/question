// pages/radio/radio.js
var app = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:1,
    icon: ["circle", "circle", "circle", "circle"],
    operate:"提交",
    chooseNum:"",
    chooseCharacter:"",
    question:"",
    flag:1
  },
  select:function(e)
  {
   
    if(this.data.flag)
    {
    var chooseOption = e.currentTarget.dataset.option;
    this.data.chooseNum=chooseOption;
    this.data.chooseCharacter=e.currentTarget.dataset.character
    console.log(chooseOption)
    var icons = ["circle", "circle", "circle", "circle"];
    icons[chooseOption] = "blackcircle";
   console.log(icons)
    this.setData({
      icon: icons
    })
    }
  },
  handleChange({ detail = {} }) {
    console.log('valu')
    console.log(detail.value)
    this.setData({
      current: detail.value
    });
  },
  next:function(e){
    var that=this;
    // 跳转
      if(this.data.index==this.data.question.length)
          wx.switchTab({
            url: '../index/index',
           
          });
            
    console.log(this.data.index)
    console.log(e.currentTarget.dataset.operate)
     if(this.data.chooseCharacter=="")
     {
      that.setData({
        visiblemodel:true,
        cancel:false
       })
     }
     else
     {
       if(e.currentTarget.dataset.operate=="提交")
       {
        if(this.data.chooseCharacter==this.data.question[this.data.index-1].true)
        {
          console.log('this.data.chooseNum'+this.data.chooseNum)
          var icons = ["circle", "circle", "circle", "circle"];
          icons[this.data.chooseNum] = "successcircle";
          that.setData({
            icon: icons,
            operate:"下一题"
          })
        }
        else
        {
          console.log(app)
          console.log("app")
          console.log(e)
          wx.request({
            url: 'https://www.gxfwz36524.com/question/public/index.php/index/index/addwrong',
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            method: "POST",
           
            data: {
             openid:app.openid,
             type:app.questionType,
             sort:app.questionSort,
              id:e.target.dataset.id
            },
            success: function(e) {
             console.log(e)
            }
          })
          var icons = ["circle", "circle", "circle", "circle"];
          icons[this.data.chooseNum] = "error";
          if(this.data.question[this.data.index-1].true=='A')
          icons[0] = "successcircle";
          else if  (this.data.question[this.data.index-1].true=='B')
          icons[1] = "successcircle";
          else if  (this.data.question[this.data.index-1].true=='C')
          icons[2] = "successcircle";
          else
          icons[3] = "successcircle";
          that.setData({
            icon: icons,
            operate:"下一题"
          })
        }
        this.data.flag=0;
       }
    else{
      this.data.chooseCharacter=""
      var icons = ["circle", "circle", "circle", "circle"];
      this.data.index=this.data.index+1;
      var index=this.data.index;
      console.log(index)
      this.setData({
        index:index,
        icon:icons,
        operate:"提交"

      })
      this.data.flag=1;
    }
  }
  },
  clear:function(){
    this.setData({
      visiblemodel:false
     })
  },
    //乱序算法
    randSort: function () {
      return Math.random() > 0.5 ? 1 : -1;
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    this.data.question=JSON.parse(options.data)
   this.setData({
     question:JSON.parse(options.data)
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
    var that=this;
    wx.getSystemInfo({
      success: function (res) {
      console.log(res)
       that.setData({
         winWidth: res.windowWidth,
         winheight: res.windowHeight
        });
      }
    });

    that.setData({
      questionSort: getApp().globalData.questionSort,
      questionType: getApp().globalData.questionType
        
    })
    console.log("求数组的长度"+this.data.question);
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