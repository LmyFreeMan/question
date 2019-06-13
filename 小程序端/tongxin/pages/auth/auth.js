//authorize.js

var app = getApp().globalData
Page({
  data: {

  },
  onShow: function() {

  },
  bindGetUserInfo: function(e) {
    console.log("sdsdsa")
    wx.getSetting({
      success: (response) => {
        console.log(typeof(response.authSetting))
        for (var i in response.authSetting) {
          console.log(response.authSetting[i])
          var t = response.authSetting[i]
        }
        console.log(typeof(t))
        if (t == true) {
          wx.login({
            success(res) {
              if (res.code) {
                //发起网络请求
                wx.request({
                  url: 'https://www.gxfwz36524.com/bbs/public/index.php/api/index/getopenid',
                  data: {
                    code: res.code
                  },
                  success: function(e) {
                    app.openid = e.data.openid
                    console.log(e)
                    wx.getUserInfo({
                      success: function(res) {
                        console.log(res)
                        console.log(res.userInfo.nickName)
                        app.nicename = res.userInfo.nickName
                        app.url = res.userInfo.avatarUrl
                        app.gender = res.userInfo.gender,
                         wx.navigateTo({
                           url: '/pages/login/login'
                         })
                      
                      },
                    })
                  }
                })
              } else {
                console.log('登录失败！' + res.errMsg)
              }
            }
          })


        } else {
          wx.showModal({
            content: '拒绝授权将导致无法关联学校帐号并影响使用，请重新点击允许授权！',
            showCancel: false
          })
        }

      },

    })


  },

})