// miniprogram/pages/search/search_name.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  search_name_input: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  onQuery: function () {
    var that = this;
    //请求的时候需要提交的参数
    var name = that.data.name;

    // console.log("js中收到的用户名：" + name + "，密码：" + pwd)

    if (name == "") {
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
        name: name,
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
            that.setData({
              queryResultlength: res.data.length,
              // queryResult: JSON.stringify(res.data, null, 2)
            })
            // console.log('[数据库] [查询记录] 成功: ', res)

            for (var i = 0; i < res.data.length;i++)
             {
                console.log('res.data: ', res.data)
                console.log('i: ', i)
              var str1 = 'queryResultname[' + i +']';
              var str2 = 'queryResultemail[' + i + ']';
              var str3 = 'queryResultcompany[' + i + ']';
              this.setData({
                // queryResultnumber[${i}]: res.data[i].number,
                // queryResultname: res.data[i].name,
                [str1]: res.data[i].name,
                [str2]: res.data[i].email,
                [str3]: res.data[i].company,
                queryResultjob: res.data[i].job,
               
                queryResult: JSON.stringify(res.data[i], null, 2)
              })

              // that.data.queryResultname[i] = res.data[i].name
              console.log('queryResult: ', queryResult)
            //  console.log('queryResultname: ', queryResultname[i])
           //   console.log('queryResultname: ', queryResultname[0])
             // console.log('queryResultname: ', str)
            // queryResultnumber[`${i}`]: queryResultnumber[i],
            // [`queryResultnumber[${i}]`]: [`res.data[${i}].number`],
            // [`queryResultemail[${i}]`]: [`res.data[${i}].email`],
            // [`queryResultname[${i}]`]: [`res.data[${i}].name`],
            // [`queryResultcompany[${i}]`]: [`res.data[${i}].company`],
            // [`queryResultjob[${i}]`]: [`res.data[${i}].job`],
            }



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