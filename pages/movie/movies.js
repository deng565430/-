import movieList from '../../utils/service/service.js';
let app = getApp();
Page({
  data: {
    title: '',
    count: 20,
    start: 0,
    isBottom: false,
    list: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    let that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    movieList.getPage(this.data.count, this.data.start, () => {
      wx.hideToast();
    })
      .then((res) => {
        let data = res.data;
        if (res.data.subjects) {
          if (res.data.subjects.length > 0) {
            this.setData({ isBottom: false });
          } else {
            this.setData({ isBottom: true });
          }
          that.setData({
            list: res.data.subjects,
            title:res.data.title,
            start:20
          })
        } else {
          wx.showModal({
            title: '加载错误',
            content: '加载错误',
            showCancel: false
          })
        }
      }, (err) => {
        wx.showModal({
          title: '加载错误',
          content: err,
          showCancel: false
        })
      })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    movieList.getPage(this.data.count, this.data.start, () => {
      wx.hideToast();
    })
      .then((res) => {
        let data = res.data;
       if(data && data.subjects){
        if(data.subjects.length>0){
          this.setData({start:this.data.start+20})
        }else{
          this.setData({ isBottom: true });
          wx.stopReachBottom;
        }
          this.setData({ list: this.data.list.concat(data.subjects) });
        }
      })

  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },
  bindViewTap: function (event) {
    wx.navigateTo({
      url: event.currentTarget.dataset.movieurl
    })
  }
})