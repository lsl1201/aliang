// 引入 封装的api 
import api from './request';

export const getProject = () => api.get( '/blogApi/getProject');
