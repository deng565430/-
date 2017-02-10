import movieDetails from '../../utils/service/service.js';
Page({
  data:{
    title:'',
    total:'',
    count:20,
    start:0,
    list:'',
    content: '',
    ooptions:'',
    showCancel: false,
    isBottom:false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options)
    let that = this;
    movieDetails.getSoMovie(this.data.count, this.data.start, options.id, () => {
      wx.hideToast();
    })
      .then((res)=>{
        if(res.data){
          this.setData({
            title:res.data.title,
            total:res.data.total,
            list:res.data.subjects,
            start:20,
            options:options.id
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
  onReachBottom:function(){
    wx.showToast({
      title:'正在加载',
      icon:'loading',
      duration:10000
    })
    movieDetails.getSoMovie(this.data.count, this.data.start, this.data.options, () => {
      wx.hideToast();
    })
    .then((res)=>{
      let data = res.data;
      if(data && data.subjects){
        if(data.subjects.length>0){
          this.setData({start:this.data.start+20})
        }else{
          this.setData({ isBottom: true });
          wx.stopReachBottom;
        }
         this.setData({ list: this.data.list.concat(data.subjects) });
      }else{
        wx.showModal({
            title: '加载错误',
            content: res.data.title,
            showCancel: false
          })
      }
    },(err)=>{
       wx.showModal({
          title: '加载错误',
          content: err,
          showCancel: false
        })
    })
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: '影吧', // 分享标题
      desc: '快点一起来看吧', // 分享描述
      path: 'path' // 分享路径
    }
  },
  bindViewTap:function(event){
  //点击跳转页面
     wx.navigateTo({
      url: event.currentTarget.dataset.movieurl
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})