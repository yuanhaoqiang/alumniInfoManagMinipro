//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    username: app.globalData.username,
    // username: "yuan"
  },

  onLoad: function () {

    // if (!wx.cloud) {
    //   wx.redirectTo({
    //     url: '../chooseLib/chooseLib',
    //   })
    //   return
    // }
    this.setData({
      logged: true,
      username: app.globalData.username,
      //avatarUrl: app.userInfo.avatarUrl,
      
    })
  },

  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  search_num: function () {
    wx.navigateTo({
      url: '../search/search_num'
    })
  },
  search_name: function () {
    wx.navigateTo({
      url: '../search/search_name'
    })
  },
  search_job: function () {
    wx.navigateTo({
      url: '../search/search_job'
    })
  },
  search_company: function () {
    wx.navigateTo({
      url: '../search/search_company'
    })
  },

  back: function () {
    wx.navigateTo({
      url: '../login/login'
    })
  }



})