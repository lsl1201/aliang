// 引入 封装的api 
import api from './request';

export const getLocationInfo = () => api.get( '/blogApi/getLocationInfo');
export const getGiteeCommitRecord = () => api.get( '/blogApi/getGiteeCommitRecord');
export const getGithubCommitRecord = () => api.get("/blogApi/getGithubCommitRecord");
export const getWorkExperience = () => api.get( '/blogApi/getWorkExperience');
// 
export const postFriendshipLinks = (data) => api({
    url: '/blogApi/postFriendshipLinks', 
    method: 'POST', 
    data
})

export const getFriendshipLinks = () => api.get( '/blogApi/getFriendshipLinks');
