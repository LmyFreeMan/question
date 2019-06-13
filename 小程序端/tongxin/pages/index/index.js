//index.js
//获取应用实例
const app = getApp()
const { $Message } = require('../../dist/base/index');
Page({
  data: {
    questionSort:"",//题目的分组,比如单选,多选
    questionType:"",//题目的类别.比如2016xx
    questiontitle:[
      "2016年LTE中高级网优考试最新题库",
      "LTE RNE00",
      "LTE RNE01",
      "LTE RNE02",
      "LTE RNE03",
      "题库-LTE华山论剑",
      "优化-1",
      "优化-2",
      "优化-3",
      "优化-4"
  
    ],
    visible1: false,
    actions1: [
        {
            name: '单选',
            icon:"success"
        },
        {
            name: '多选',
            icon:"add"
        },
        {
            name: '判断',
            icon:"right"
            
        },
        {
          name: '填空',
          icon:"document"
      },
      {
        name: '论述实操',
        icon:"editor"
        
    }
      ]
  },


  handleOpen1 (e) {
    console.log(e.currentTarget.dataset.title)
    this.data.questionType=e.currentTarget.dataset.title
    this.setData({
        visible1: true
    });
},
handleCancel1 () {
  this.setData({
      visible1: false
  });
},
go()
{
  wx.navigateTo({
    url: '/pages/test/test'
  })
},
handleClickItem1 ({ detail }) {
  const index = detail.index + 1;
   console.log(index)
   if(index==1)
   this.data.questionSort="单选"
   else if(index==2)
   this.data.questionSort="多选"
   else if(index==3)
   this.data.questionSort="判断"
   else if(index==4)
   this.data.questionSort="填空"
   else 
   this.data.questionSort="论述实操"
   console.log("555")
   console.log(this.data.questionSort)
   console.log(this.data.questionType)
   var questionType=this.data.questionType
   var questionSort=this.data.questionSort
   getApp().globalData.questionSort=questionSort;
   getApp().globalData.questionType=questionType
   console.log('我是index'+index)
   if(index==1||index==2)
   this.request1(questionSort,questionType)
   if(index==5||index==4||index==3)
   {
     console.log("333444")
     this.request2(questionSort,questionType)
   }
},
clear:function(){
  this.setData({
    visiblemodel:false
   })
},
request1:function(questionSort,questionType)
{
  var that=this
  wx.request({
    url : "https://www.gxfwz36524.com/question/public/index.php",
    method: "POST",
    data: {
     questionSort:questionSort,
     questionType:questionType
    },
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    success: function (res) {
       console.log(res.data)
       console.log("success655")
       console.log(typeof(res))

       if(res.data=='fail')
       {
         that.setData({
          visiblemodel:true,
          cancel:false
         })
       }
       else
       {
        if(questionSort=="单选")
        wx.navigateTo({
          url: '../radio/radio?data='+JSON.stringify(res.data)
        })
        if(questionSort=="多选")
        wx.navigateTo({
         url: '../select/select?data='+JSON.stringify(res.data)
       })
       }
    },
  
  })


},
request2:function(questionSort,questionType)
{
  var that=this
  wx.request({
    url : "https://www.gxfwz36524.com/question/public/index.php/index/index/home",
    method: "POST",
    data: {
     questionSort:questionSort,
     questionType:questionType
    },
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    success: function (res) {
       console.log(res.data)
       console.log("success655")
       console.log(typeof(res))

       if(res.data=='fail')
       {
         that.setData({
          visiblemodel:true,
          cancel:false
         })
       }
       else
       {
         
        if(questionSort=="填空")
        wx.navigateTo({
         url: '../filling/filling?data='+JSON.stringify(res.data)
       })
       if(questionSort=="论述实操"||questionSort=="判断")
       wx.navigateTo({
        url: '../dowork/dowork'
      })
       }
    },
  
  })


}

})
