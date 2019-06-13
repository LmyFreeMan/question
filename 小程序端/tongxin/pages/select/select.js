var app = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:1,
    icon: ["circle", "circle", "circle", "circle", "circle", "circle", "circle"],
    operate:"提交",
    chooseNum:"",
    chooseCharacter:"",
    question:"",
    flag:1,
    len:"",
    answer:[],
    change:[]
  },
  select:function(e)
  {
   
    var chooseOption = e.currentTarget.dataset.option;
    this.data.chooseNum=chooseOption;
    this.data.chooseCharacter=e.currentTarget.dataset.character
    console.log('dasda')
    console.log(this.data.chooseCharacter)
    console.log(this.data.icon[chooseOption]=="blackcircle")
      if(this.data.icon[chooseOption]=="blackcircle")
      {
        this.data.icon[chooseOption]="circle";
        var i = this.data.answer.indexOf(this.data.chooseCharacter)
        var j=this.data.change.indexOf(this.data.chooseNum)
        this.data.answer.splice(i,1)
        this.data.change.splice(j,1)
      }
      else
      {
        this.data.icon[chooseOption]="blackcircle";
        this.data.answer.push(this.data.chooseCharacter)
        this.data.change.push(this.data.chooseNum)
      }
    console.log( this.data.icon[chooseOption])
    var icons=this.data.icon;

   console.log(icons)
    this.setData({
      icon: icons
    })
    
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
    //  if(this.data.index>this.data.question.length)
    console.log("next");
    console.log(this.data.change)
    console.log((this.data.question[this.data.index-1].true))
  //   console.log(e.currentTarget.dataset.operate)
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
        var icons = ["circle", "circle", "circle", "circle", "circle", "circle", "circle"];
        if((this.data.answer.sort()).toString().replace(/,/g, "")==this.data.question[this.data.index-1].true)
        {
          for(var m=0;m<this.data.change.length;m++)
          icons[m] = "successcircle";
          that.setData({
            icon: icons,
            operate:"下一题"
          })
        }
        else
        {
          console.log("else")
          console.log(this.data.question[this.data.index-1].true.split(""))
          console.log(this.data.chooseCharacter)
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
          var icons = ["circle", "circle", "circle", "circle", "circle", "circle", "circle"];
          for(var m=0;m<this.data.answer.length;m++)
          {
            if (this.data.answer[m].indexOf(this.data.question[this.data.index-1].true)==-1)
             {
              if(this.data.answer[m]=='A')
              icons[0] = "error";
              if  (this.data.answer[m]=='B')
              icons[1] = "error";
              if  (this.data.answer[m]=='C')
              icons[2] = "error";
              if  (this.data.answer[m]=='D')
              icons[3] = "error";
              if  (this.data.answer[m]=='E')
              icons[4] = "error";
              if  (this.data.answer[m]=='F')
              icons[5] = "error";
             }

          }
          for(var m=0;m<this.data.question[this.data.index-1].true.split("").length;m++)
          icons[m] = "successcircle";
          that.setData({
            icon: icons,
            operate:"下一题"
          })
        }
     
       }
    else{
      if(this.data.index==this.data.question.length)
      wx.switchTab({
        url: '../index/index',
       
      });
      var icons = ["circle", "circle", "circle", "circle", "circle", "circle", "circle"];
        this.data.index=this.data.index+1;
      var index=this.data.index;
      var lens=Object.keys(this.data.question[index-1].option).length;
      this.data.chooseCharacter="";
      console.log("22222222")
      console.log(index)
      console.log(lens)
      this.setData({
        index:index,
        icon:icons,
        len:lens,
        operate:"提交"

      })
      
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
    var lens=Object.keys(this.data.question[0].option).length
    this.data.len=this.data.question.length;
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
    console.log("ddd")
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
    console.log("求数组的长度"+this.data.question.length);
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