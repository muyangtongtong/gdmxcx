// pages/views/car/car.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas: "",
    prooptlist: [],
    choiceqty: 0,
    member: {
      'fixationParameter': {
        'memberid': '521',
        'memtype': 0,
        'channeltype': 'A',
        'malorgid': '597',
        'outorgid': '854'
      }
    },
    cartversion: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.intoshowCart()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},
  /**
   * 展示购物车
   */
  intoshowCart() {
    var that = this;
    that.data.prooptlist = []
    wx.request({
      method: "POST",
      url: "http://10.10.28.49:8002/cart/intoShowCart",
      data: that.data.member,
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        let {
          data
        } = res.data
        that.setData({
          datas: data
        })
        if (that.data.datas.totalqty === that.data.datas.choiceqty) {
          that.setData({
            checkeAll: true
          })
        } else if (that.data.datas.totalqty !== that.data.datas.choiceqty) {
          that.setData({
            checkeAll: false
          })
        }
        that.setData({
          cartversion: data.cartversion
        })
        for (var i = 0; i < that.data.datas.groups.length; i++) {
          for (var j = 0; j < that.data.datas.groups[i].elements.length; j++) {
            if (that.data.datas.groups[i].elements[j].ischoice === 1 || that.data.datas.groups[i].ischoice === 1) { // 判断被选中
              if (that.data.datas.groups[i].grouptype === 1) { // 判断是否是组合
                if (that.data.datas.groups[i].elements[j].showtype === 2) { // 判断是否是组合标头信息,商品级促销
                  that.data.prooptlist.push(JSON.parse(that.data.datas.groups[i].elements[j].operparam))
                }
              } else {
                that.data.prooptlist.push(that.data.datas.groups[i].elements[j])
              }
            }
          }
        }
        console.log('res=>', res);
        console.log('that.data.datas.groups=>', that.data.datas)
      }
    })
  },
  // 点击任选组合时触发的方法
  cartPromoPop(clickparam) {
    // maxqty = 0 时  弹出框不弹出
    if (this.tableData.maxqty === 0) {
      this.dialogVisible = false
    } else {
      this.dialogVisible = true
      this.$http.post('/cart/getShowCartPromoPop', Object.assign({}, this.member, {
        'answersParameter': JSON.parse(clickparam)
      }))
        .then(res => {
          this.tableData = res.data.data
          console.log('this.tableData=>', res.data.data)
          // 得到组合中的商品数量 在弹出框中显示
          this.poplist = 0
          for (var i = 0; i < this.tableData.showCartProductInfoList.length; i++) {
            this.poplist = this.poplist + this.tableData.showCartProductInfoList[i].qty
          }
        })
      this.poplist = this.tableData.selqty * this.tableData.groupqty
    }
  }
  // 选择或取消选择
})