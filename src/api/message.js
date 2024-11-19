// 引入 封装的api 
import api from './request';

export const getMassage = () => api.get( '/blogApi/setMessage');
export const postMassage = (data) => api({
    url: '/blogApi/setMessage', 
    method: 'POST', 
    data
})