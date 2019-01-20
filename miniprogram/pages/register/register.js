const app = getApp()


Page({
  data: {
    username: "",
    password: "",
    passwordconfirm: ""
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
  passwordconfirminput: function(e) {
    this.setData({
      passwordconfirm: e.detail.value
    })
  },
  register: function() {
    var that = this;
    //请求的时候需要提交的参数
    var name = that.data.username;
    var pwd = that.data.password
     console.log("js中收到的用户名："+name+"，密码："+pwd)

    if (name == "") {
      wx.showModal({
        title: "信息提示",
        content: "用户名不能为空"
        // content: name
      })
    } else if (pwd == "") {
      wx.showModal({
        title: "信息提示",
        content: "请驶入密码"
      })
    } else if (that.data.passwordconfirm == "") {
      wx.showModal({
        title: '信息提示',
        content: '请确认密码',
      })
    } else if (that.data.passwordconfirm != that.data.password) {
      wx.showModal({
        title: '信息提示',
        content: '两次密码输入不一致',
      })
    } else {


      const db = wx.cloud.database()
      // 查询当前用户所有的 counters
      db.collection('user').where({
        //_openid: this.data.openid
        //查询用户名是否存在
        name: name,
      //  password: pwd
      }).get({
        success: res => {
          //用户名不存在
          if (res.data == "") {
            // wx.showToast({
            //   icon: 'none',
            //   title: '用户名或密码错误'
            // })

            //向数据库插入信息
            db.collection('user').add({
              data: {
                name: name,
                password: pwd,
              },
              success: res => {
                // 在返回结果中会包含新创建的记录的 _id
                // this.setData({
                //   // counterId: res._id,
                //   // count: 1
                // })
                wx.showToast({
                  title: '注册成功',
                })

                //跳转到查询界面
                wx.navigateTo({
                  url: '../login/login',
                })

                console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
              },
              fail: err => {
                wx.showToast({
                  icon: 'none',
                  title: '新增记录失败'
                })
                console.error('[数据库] [新增记录] 失败：', err)
              }
            })



          } else {
            //用户名存在
            wx.showToast({
              icon: 'none',
              title: '用户名已存在'
            })
            // //跳转到查询界面
            // wx.navigateTo({
            //   url: '../databaseGuide/databaseGuide',
            // })
          }
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





    // //发送ajax请求将用户注册信息传递过去进行注册
    // wx.request({
    //   url: 'http://140.143.121.74/application/index/regist',
    //   data: {
    //     name: user_name,
    //     pwd: user_pwd
    //   },
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   method: "POST",
    //   dataType: "json",
    //   success: function(res) {
    //     //console.log("成功")
    //     console.log("响应的数据" + res.data)
    //     if (res.name == username) {
    //       wx.showModal({
    //         title: "信息提示",
    //         content: "该用户已被注册"
    //       })
    //     } else {
    //       wx.showModal({
    //           title: "信息提示",
    //           content: "注册成功"
    //         }),
    //         wx.switchTab({
    //           url: "../login/login"
    //         })
    //     }
    //   },
    //   fail: function(res) {
    //     wx: wx.showToast({
    //       title: '服务器网络错误，请稍后重试',
    //       icon: 'loading',
    //       duration: 1500,
    //     })
    //   },

    //   complete: function(res) {

    //   }
    // })

  },
  back: function() {
    wx.navigateTo({
      url: '../login/login'
    })
  }
})