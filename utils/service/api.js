const urls = 'https://api.douban.com';
const movie_api = urls + '/v2/movie';
//电影条目
const movieApi = {
    // 电影条目信息
    movieList : movie_api +'/subject',
    //影人条目
    celebrityList : movie_api + '/celebrity',
    // 搜索
    seek : movie_api + '/search'
};
//榜单
const crunchiesApi = {
    //正在热映
    inTheaters : movie_api + '/in_theaters',
    //即将上映
    comingSoon : movie_api + '/coming_soon',
    //top250
    top250 : movie_api + '/top250',
    //口碑榜
    weekly : movie_api + '/weekly',
    //北美票房榜
    usBox : movie_api + '/us_box',  
    //新片榜
    newMovies : movie_api + '/new_movies'
}

export default {movieApi:movieApi,crunchiesApi:crunchiesApi}

