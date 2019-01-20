const app = getApp()

Page({

  data: {
    username: "",
    password: "",
    openid: '',
  },

  onGetOpenid: function () {
    // // 调用云函数
    // wx.cloud.callFunction({
    //   name: 'login',
    //   data: {},
    //   success: res => {
    //     console.log('[云函数] [login] user openid: ', res.result.openid)
    //     app.globalData.openid = res.result.openid
    //     wx.navigateTo({
    //       url: '../userConsole/userConsole',
    //     })
    //   },
    //   fail: err => {
    //     console.error('[云函数] [login] 调用失败', err)
    //     wx.navigateTo({
    //       url: '../deployFunctions/deployFunctions',
    //     })
    //   }
    // })
  },


  onLoad: function(options) {
    
    
    // // 调用云函数
    // wx.cloud.callFunction({
    //   name: 'login',
    //   data: {},
    //   success: res => {
    //     console.log('[云函数] [login] user openid: ', res.result.openid)
    //     app.globalData.openid = res.result.openid
    //     // wx.navigateTo({
    //     //   url: '../userConsole/userConsole',
    //     // })
    //   },
    //   fail: err => {
    //     console.error('[云函数] [login] 调用失败', err)
    //     wx.navigateTo({
    //       url: '../deployFunctions/deployFunctions',
    //     })
    //   }
    // })

    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
  },
 

  usernameinput: function(e) {
    this.setData({
      username: e.detail.value
    })
  },

  passwordinput: function(e) {
    this.setData({
      password: e.detail.value
    })
  },

  //点击登陆的时候触发的事件
  signin: function() {
    var that = this;
    //登陆时传过来的参数
    var name = that.data.username
    var pwd = that.data.password
    if (that.data.username == "") {
      wx.showToast({
        icon: 'none',
        title: '用户名不能为空！'
      })
    } else if (that.data.password == "") {
      wx.showToast({
        icon: 'none',
        title: '请输入密码！'
      })
    }else{

      //console.log("用户名：" + name + "=密码：" + pwd)

      const db = wx.cloud.database()
      // 查询当前用户所有的 counters
      db.collection('user').where({
        //_openid: this.data.openid
        //查询用户名、密码
        name: name,
        password: pwd
      }).get({
        success: res => {
          //用户名或密码不正确
          if (res.data == "") {
            wx.showToast({
              icon: 'none',
              // title: '用户名或密码错误'
              title: '用户名或密码错误' + res
            })
          } else {
            //用户名和密码都正确
            wx.showToast({
              icon: 'none',
              title: '登录成功'
            })

            // this.setData({
            //   username : name,
            // })

            app.globalData.username = name;
            //跳转到查询界面
            wx.navigateTo({
              url: '../home/home',
            })
            // wx.switchTab({
            //   url: '../databaseGuide/databaseGuide',
            // })

            // this.setData({
            //   queryResult: JSON.stringify(res.data, null, 2)
            //   // queryResult: JSON.stringify(res.data[password], null, 2)
            // })
          }
          // console.log('[数据库] [查询记录] 成功: ', res)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '登录失败'
          })
          console.error('[数据库] [查询记录] 失败：', err)
        }
      })

    }
    

  },



  //点击注册的时候触发的事件
  register: function() {
    wx.navigateTo({
      url: '../register/register'
    })
  },

  //点击微信快速注册的时候触发的事件
  quicklysignin: function() {
    const db = wx.cloud.database()
    db.collection('user').where({
      _openid: this.data.openid
      // //查询用户名、密码
      // name: name,
      // password: pwd
    }).get({
      success: res => {
        // if (res.data != "") 
        {
          //用户名和密码都正确
          wx.showToast({
            icon: 'none',
            title: '登录成功' + this.data.openid
          })
          //跳转到查询界面
          wx.navigateTo({
            url: '../home/home',
          })
        }
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '登录失败' + this.data.openid
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  }
})