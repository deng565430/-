import movieDetails from '../../utils/service/service.js';
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    count: 20,
    start: 0,
    isBottom: false,
    list: [],
    imgUrls:[
      "../../images/ShufflingFigure-01.jpeg",
      "../../images/ShufflingFigure-03.jpg",
      "../../images/ShufflingFigure-04.jpg",
    ]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    movieDetails.comingSoon(this.data.count, this.data.start, () => {
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
            title: res.data.title,
            start: 20
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
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
   onReachBottom: function () {
    // 页面上拉触底事件的处理函数
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    movieDetails.comingSoon(this.data.count, this.data.start, () => {
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
  //打开电影详情
   bindViewTap: function (event) {
    wx.navigateTo({
      url: event.currentTarget.dataset.movieurl
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
})
