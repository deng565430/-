import apis from "./api.js";
class MovieService {
    constructor() {
        this.crunchiesApi = apis.crunchiesApi;
    }
    //top250分页数据
    getPage(count, start, complete) {
        let promise = new Promise((resolve, reject) => {
            wx.request({
                url: `${this.crunchiesApi.top250}?count=${count || 20}&start=${start || 0}`,
                method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                header: { 'Content-Type': 'json' }, // 设置请求的 header
                success: function (res) {
                    // success
                    resolve(res);

                },
                fail: function () {
                    // fail
                    reject();
                },
                complete: function () {
                    complete && complete();
                }
            })
        })
        return promise;
    };
    //即将上映电影
    comingSoon(count, start, complete) {
        let promise = new Promise((resolve, reject) => {
            wx.request({
                url: `${apis.crunchiesApi.comingSoon}?count=${count || 20}&start=${start || 0}`,
                method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                header: { 'Content-Type': 'json' }, // 设置请求的 header
                success: function (res) {
                    // success
                    resolve(res);

                },
                fail: function () {
                    // fail
                    reject();
                },
                complete: function () {
                    complete && complete();
                }
            })
        })
        return promise;
    };
    //获取详细信息
    getInfo(id, complete) {
        let promise = new Promise((resolve, reject) => {
            wx.request({
                url: `${apis.movieApi.movieList}/${id}`,
                method: 'GET',
                header: { 'Content-Type': 'json' }, // 设置请求的 header
                success: function (res) {
                    // success
                    resolve(res);
                },
                fail: function (err) {
                    // fail
                    reject(err);
                },
                complete: function () {
                    complete && complete();
                }
            })
        })

        return promise;
    };
    //模糊搜索电影
    getSoMovie(count, start, id, complete) {
        let promise = new Promise((resolve, reject) => {
            wx.request({
                url: `${apis.movieApi.seek}?count=${count || 20}&start=${start || 0}&q=${id}`,
                method: 'GET',
                header: { 'Content-Type': 'json' }, // 设置请求的 header
                success: function (res) {
                    // success
                    resolve(res);
                },
                fail: function (err) {
                    // fail
                    reject(err);
                },
                complete: function () {
                    complete && complete();
                }
            })
        })

        return promise;
    }

}
export default new MovieService();