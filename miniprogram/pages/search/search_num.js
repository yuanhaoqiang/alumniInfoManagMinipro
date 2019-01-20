// miniprogram/pages/search/search_num.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: "",
    queryResultnumber: "",
    queryResultname: "",
    queryResultemail: "",
    queryResultcompany: "",
    queryResultjob: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },



  search_num_input: function(e) {
    this.setData({
      num: e.detail.value
    })
  },

  onQuery: function() {
    var that = this;
    //请求的时候需要提交的参数
    var num = that.data.num;

    // console.log("js中收到的用户名：" + name + "，密码：" + pwd)

    if (num == "") {
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
        number: num,
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
            console.log('res.data: ', res.data)
            console.log('queryResult: ', res.data.length)
           // for (var i = 0; i < res.data.length;i++)
          // //  {
          //     console.log('res.data: ', res.data)
          //     console.log('i: ', i)
          //     that.setData({
          //       queryResult: JSON.stringify(res.data, null, 2),
          //       queryResultlength: res.data.length,
                // queryResultnumber[`${i}`]: queryResultnumber[i],
                // [`queryResultnumber[${i}]`]: [`res.data[${i}].number`],
                // [`queryResultemail[${i}]`]: [`res.data[${i}].email`],
                // [`queryResultname[${i}]`]: [`res.data[${i}].name`],
                // [`queryResultcompany[${i}]`]: [`res.data[${i}].company`],
                // [`queryResultjob[${i}]`]: [`res.data[${i}].job`],
                //  queryResultnumber: res.data.number,
                // queryResultname: res.data[0].name,
                // queryResultemail: res.data[0].email,
                // queryResultcompany: res.data[0].company,
                // queryResultjob: res.data[0].job,


                // queryResult: '',
           // for (var i = 0; i < res.data.length; i++)
            {
              this.setData({
                // queryResult: queryResult + `[${ i }]` + "\n    " + "姓名:" + res.data[i].name + "\n    学号:" + res.data[i].number + "\n    手机号:" + res.data[i].tel + "\n    邮箱:" + res.data[i].email + "\n    公司:" + res.data[i].company + "\n    工作:" + res.data[i].job + "\n"
                queryResultlength: res.data.length, 
                queryResultnumber: res.data[0].number,
                queryResultname: res.data[0].name,
                queryResultemail: res.data[0].email,
                queryResultcompany: res.data[0].company,
                queryResultjob: res.data[0].job,
                
                queryResult: JSON.stringify(res.data, null, 2)
             })
              console.log('queryResult: ', queryResult)
             
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

  back: function() {
    wx.navigateTo({
      url: '../search/search'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  // formSubmit: function (e) { },
})