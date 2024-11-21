// 引入 封装的api 
import api from './request';

export const getMassage = () => api.get( '/blogApi/getMessage');
export const postMassage = (data) => api({
    url: '/blogApi/setMessage', 
    method: 'POST', 
    data
})