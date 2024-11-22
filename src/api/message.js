// 引入 封装的api 
import api from './request';

export const getMassage = (params) =>
  api({
    url: "/blogApi/getMessage",
    method: "get",
    params,
  });
export const postMassage = (data) => api({
    url: '/blogApi/setMessage', 
    method: 'POST', 
    data
})