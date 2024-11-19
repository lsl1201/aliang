// 引入 封装的api 
import api from './request';

export const getArticleList = () => api.get( '/blogApi/getArticleList');
// export const getArticle = (name) => api.get( '/blogApi/getArticle' + name);

export const getArticle = (params) => api({
    url: '/blogApi/getArticle', 
    method: 'GET', 
    params
})
