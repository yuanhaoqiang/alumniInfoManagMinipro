//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    username: app.globalData.username
    //username: "yuan"
  },

  onLoad: function(e) {
   
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    this.setData({
      logged: true,
     // avatarUrl: app.userInfo.avatarUrl,
      // avatarUrl:e.detail.userInfo.avatarUrl,
      // userInfo: app.userInfo,
      username : app.globalData.username
    })

  },

  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
        username: app.globalData.username
      })
    }
  },

  doUpload : function() {
    wx.navigateTo({
      url: '../insert/insert'
    })
  },
  search: function () {
    wx.navigateTo({
      url: '../search/search'
    })
  },

  back: function() {
    wx.navigateTo({
      url: '../login/login'
    })
  }



})