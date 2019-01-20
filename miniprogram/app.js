//app.js
App({

  globalData: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    username: '',
  },

  onLaunch: function() {

    var that = this;

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success(res) {
              const userInfo = res.userInfo
              const nickName = userInfo.nickName
              const avatarUrl = userInfo.avatarUrl
              const gender = userInfo.gender // 性别 0：未知、1：男、2：女
              const province = userInfo.province
              const city = userInfo.city
              const country = userInfo.country
              
            }

          })

        } 
      }
    })
  }


})

if (!wx.cloud) {
  console.error('请使用 2.2.3 或以上的基础库以使用云能力')
} else {
  wx.cloud.init({
    traceUser: true,
  })
}



// if (!this.logged) {
//   this.setData({
//     logged: true,
//     avatarUrl: this.detail.userInfo.avatarUrl,
//     userInfo: this.detail.userInfo
//   })
// }
