const app = getApp()

Page({
  data: {
    name: "",
    number: "",
    tel: "",
    email: "",
    job: "",
    company: "",
    username: "",
  },
  nameinput: function(e) {
    this.setData({
      name: e.detail.value
    })
  },
  numberinput: function(e) {
    this.setData({
      number: e.detail.value
    })
  },
  telinput: function(e) {
    this.setData({
      tel: e.detail.value
    })
  },
  emailinput: function(e) {
    this.setData({
      email: e.detail.value
    })
  },
  jobinput: function(e) {
    this.setData({
      job: e.detail.value
    })
  },
  companyinput: function(e) {
    this.setData({
      company: e.detail.value
    })
  },

  fixinformation: function() {
    var that = this;
    var name = that.data.name
    var number = that.data.number
    var tel = that.data.tel
    var email = that.data.email
    var job = that.data.job
    var company = that.data.company
    var username = app.globalData.username

    console.log('username: ', username)

    if (that.data.name == "") {
      wx.showModal({
        title: "信息提示",
        content: "姓名不能为空"
      })
    } else if (that.data.number == "") {
      wx.showModal({
        title: '信息提示',
        content: '学号不能为空',
      })
    } else if (that.data.tel == "") {
      wx.showModal({
        title: "信息提示",
        content: "电话号不能为空",
      })
    } else if (that.data.email == "") {
      wx.showModal({
        title: '信息提示',
        content: '请填写邮箱地址',
      })
    } else {

      const db = wx.cloud.database()
      
      db.collection('alumniInformation').where({ number: number }).get({
        success: res => {
          //学号不存在
          if (res.data == "" || (res.data._id == username) ) {


      db.collection('alumniInformation').doc(username)
        .update({
          data: {
            // _id: username,
            user: username,
            name: name,
            number: number,
            tel: tel,
            email: email,
            job: job,
          },
          success: res => {
            //在返回结果中会包含新创建的记录的 _id
            this.setData({
              counterId: res._id,
            })
            wx.showToast({
              title: '信息添加成功',
            })
            console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '还没有您的信息,请选择新建按钮'
            })
            console.error('[数据库] [新增记录] 失败：', err)
          }
        })




          } else {
            //用户名存在
            wx.showToast({
              icon: 'none',
              title: '已有该学号'
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

    

  },

  insertinformation: function () {
    var that = this;
    var name = that.data.name
    var number = that.data.number
    var tel = that.data.tel
    var email = that.data.email
    var job = that.data.job
    var company = that.data.company
    var username = app.globalData.username

    console.log('username: ', username)

    if (that.data.name == "") {
      wx.showModal({
        title: "信息提示",
        content: "姓名不能为空"
      })
    } else if (that.data.number == "") {
      wx.showModal({
        title: '信息提示',
        content: '学号不能为空',
      })
    } else if (that.data.tel == "") {
      wx.showModal({
        title: "信息提示",
        content: "电话号不能为空",
      })
    } else if (that.data.email == "") {
      wx.showModal({
        title: '信息提示',
        content: '请填写邮箱地址',
      })
    } else {

      const db = wx.cloud.database()

      db.collection('alumniInformation').where({ number: number }).get({
        success: res => {
          //学号不存在
          if (res.data == "") {
            

            db.collection('alumniInformation').add({
              data: {
                _id: username,
                user: username,
                name: name,
                number: number,
                tel: tel,
                email: email,
                job: job,
              },
              success: res => {
                // 在返回结果中会包含新创建的记录的 _id
                this.setData({
                  counterId: res._id,
                })
                wx.showToast({
                  title: '信息添加成功',
                })
                console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
              },
              fail: err => {
                wx.showToast({
                  icon: 'none',
                  title: '已有您的信息,请选择修改按钮'
                })
                console.error('[数据库] [新增记录] 失败：', err)
              }
            })




          } else {
            //用户名存在
            wx.showToast({
              icon: 'none',
              title: '已有该学号'
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

  },


  back: function() {
    wx.navigateTo({
      url: '../home/home'
    })
  }
})