// miniprogram/pages/search/search_company.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    company:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  search_company_input: function (e) {
    this.setData({
      company: e.detail.value
    })
  },

  onQuery: function () {
    var that = this;
    //请求的时候需要提交的参数
    var company = that.data.company;

    // console.log("js中收到的用户名：" + name + "，密码：" + pwd)

    if (company == "") {
      wx.showModal({
        title: "信息提示",
        content: "搜索不能为空"
        // content: name
      })
    } else {

      const db = wx.cloud.database()
      // 查询当前用户所有的 counters
      db.collection('alumniInformation').where({
        //_openid: this.data.openid
        //查询用户名是否存在
        company: company,
        //  password: pwd
      }).get({
        success: res => {
          //用户名不存在
          if (res.data == "") {
            wx.showToast({
              icon: 'none',
              title: '没有查到任何消息'
            })
          } else {
            //用户名存在
            // wx.showToast({
            //   icon: 'none',
            //   title: '用户名已存在'
            // })
            this.setData({
              queryResult: JSON.stringify(res.data, null, 2)
            })
            console.log('[数据库] [查询记录] 成功: ', res)
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
  back: function () {
    wx.navigateTo({
      url: '../search/search'
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