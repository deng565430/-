import movieDetails from '../../utils/service/service.js';
Page({
  data:{
     info: {}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    let that = this;
    movieDetails.getInfo(options.id)
      .then((res)=>{
        if(res.data){
         // console.log(res.data)
          this.setData({
            info: res.data
          })
        }else {
          wx.showModal({
            title: '加载错误',
            content: '影片详情加载错误，请重试',
            showCancel: false
          })
        }
      },(err)=>{
        wx.showModal({
          title: '加载错误',
          content: '影片详情加载错误，请重试',
          showCancel: false
        })
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