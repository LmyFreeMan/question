var app = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 1,
    icon: ["circle", "circle", "circle", "circle", "circle", "circle", "circle"],
    operate: "下一题",
    chooseNum: "",
    chooseCharacter: "",
    question: "",
    flag: 1,
    len: "",
    score:0,
    answer: [],
    change: [],
    counttime:5400
   
  },
  select: function (e) {
    console.log("I am select")
    console.log(this.data.question)
  
    var chooseOption = e.currentTarget.dataset.option;
     //选中的数字
    this.data.chooseNum = chooseOption;
      //选中的字符
    this.data.chooseCharacter = e.currentTarget.dataset.character
    console.log('dasda')
    console.log(this.data.chooseCharacter)
    console.log(this.data.icon[chooseOption] == "blackcircle")
    if (this.data.icon[chooseOption] == "blackcircle") {
      this.data.icon[chooseOption] = "circle";
      var i = this.data.answer.indexOf(this.data.chooseCharacter)
      var j = this.data.change.indexOf(this.data.chooseNum)
      this.data.answer.splice(i, 1)
      this.data.change.splice(j, 1)
    }
    else {
      this.data.icon[chooseOption] = "blackcircle";
      this.data.answer.push(this.data.chooseCharacter)
      this.data.change.push(this.data.chooseNum)
    }
    console.log(this.data.icon[chooseOption])
    var icons = this.data.icon;

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
  next: function (e) {
    console.log("I am next")
    console.log(typeof(this.data.question))
    console.log(this.data.question)
    console.log(this.data.index)
    var that = this;
    // 跳转
    //  if(this.data.index>this.data.question.length)
  
    if (this.data.chooseCharacter == "") {
      that.setData({
        visiblemodel: true,
        cancel: false
      })
    }
    else {

             console.log("this.data.question.length"+this.data.question.length)
            this.data.question[this.data.index-1].true=this.data.question[this.data.index-1].true.replace(",","")
            this.data.question[this.data.index-1].true=this.data.question[this.data.index-1].true.replace(",","")
            this.data.question[this.data.index-1].true=this.data.question[this.data.index-1].true.replace(",","")
            this.data.question[this.data.index-1].true=this.data.question[this.data.index-1].true.replace(",","")
            this.data.question[this.data.index-1].true=this.data.question[this.data.index-1].true.replace(",","")
            this.data.question[this.data.index-1].true=this.data.question[this.data.index-1].true.replace(",","")
            console.log("查看正确答案")
          
            if((this.data.answer.sort()).toString().replace(/,/g, "")==this.data.question[this.data.index-1].true)
             {
               this.data.score=this.data.score+1;
             }
             if (this.data.index == this.data.question.length)
             {
                var score=this.data.score
               wx.request({
                 url: 'https://www.gxfwz36524.com/question/public/index.php/index/index/addResult',
                 method: 'POST',
                 header: {
                   "Content-Type": "application/x-www-form-urlencoded"
                 },
                 data: {
                   schoolnum: app.schoolnum,
                   score: score,
                   openid:app.openid
                 },
                 success: function(e) {
                  that.setData({
                    visiblemode3: true,
                    cance3: false
                  })
                 }
           
               })
   
             }
          var icons = ["circle", "circle", "circle", "circle", "circle", "circle", "circle"];
          this.data.index = this.data.index + 1;
          var index = this.data.index;
          console.log("我是index"+index)
          var lens = Object.keys(this.data.question[index - 1].option).length;
          console.log("lens="+lens)
          this.data.chooseCharacter = "";
          this.data.answer=[]
       
          this.setData({
            index: index,
            icon: icons,
            len: lens
          })
        }
    },
  clear: function () {
    this.setData({
      visiblemodel: false
    })
  },
  clear2: function () {
    wx.switchTab({
      url: '../index/index',
    });
  },
  clear5: function () {
    wx.switchTab({
      url: '../index/index',
    });
  },
  sub:function()
  {
    console.log("sub")
    this.setData({
      visiblemode6: true
    })
  },
  clear7:function()
  {
    console.log("sub")
    this.setData({
      visiblemode6: false
    })
  },
  clear6:function()
  {
    var that=this
    var score=this.data.score
    wx.request({
      url: 'https://www.gxfwz36524.com/question/public/index.php/index/index/addResult',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        schoolnum: app.schoolnum,
        score: score,
        openid:app.openid
      },
      success: function(e) {
        wx.switchTab({
          url: '../../pages/index/index',
          success: (result) => {
            
          },
          fail: () => {},
          complete: () => {}
        });
          
      }

    })
  },
  clear1: function () {
   wx.switchTab({
     url: '../../pages/index/index',
     success: (result) => {
       
     },
     fail: () => {},
     complete: () => {}
   });
     
  },


  clear4: function () {
    wx.switchTab({
      url: '../../pages/index/index',
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      
   },
  onLoad: function (options) {

   
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

    var that=this

    wx.request({
      url : "https://www.gxfwz36524.com/question/public/index.php/index/index/test",
      method: "POST",
      data: {
        schoolnum: app.schoolnum
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if(res.data.statuCode==222)
        {
          that.setData({
            visiblemode2: true,
            cance2: false
          })
           
        }
       else
       {
        countDown(that,5400);
        that.data.question = res.data
        var lens =Object.keys(that.data.question[that.data.index - 1].option).length;
        console.log("ppp")
        console.log("lens="+lens)
        that.data.len = that.data.question.length;
        that.setData({
          question: res.data,
          len: lens
        
        })


       }
      },
    
    })
  

    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        that.setData({
          winWidth: res.windowWidth,
          winheight: res.windowHeight
        });
      }
    });

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

//倒计时60秒
function countDown(that, count) {
  if (count == 0) {
    var score=that.data.score
    wx.request({
      url: 'https://www.gxfwz36524.com/question/public/index.php/index/index/addResult',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        schoolnum: app.schoolnum,
        score: score,
        openid:app.openid,

      },
      success: function(e) {
       that.setData({
         visiblemode5: true,
         cance5: false,
         counttime:0
       })
      }

    })
    return ;
  }
  that.setData({
   counttime: count
  })
  setTimeout(function () {
   count--;
   countDown(that, count);
  }, 1000);
 0
 }