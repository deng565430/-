import movieDetails from '../../utils/service/service.js';
Page({
  data:{
     value: ''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

  },
  bindinput:function(e){
    this.setData({
        value:e.detail.value
    })
  },
  seeksMovie:function(e){
    let value = e.currentTarget.dataset.value
   wx.navigateTo({
      url: value
    })
    
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})