// 引入 封装的api
import api from "./request";

export const getArticleList = (page = 1) =>
  api.get("/blogApi/getArticle?page=" + page);
// export const getArticle = (name) => api.get( '/blogApi/getArticle' + name);

// export const getArticle = (params) => api({
//     url: '/blogApi/getArticle',
//     method: 'GET',
//     params
// })
// 获取文章列表
// export const getArticle = (params) => api({
//     url: '/blogApi/getArticle',
//     method: 'GET',
//     params
// })

// 获取文章详情
export const getArticleContent = (id) =>
  api.get("/blogApi/getArticleContent?id=" + id);
