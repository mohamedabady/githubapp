import axios from 'axios';

const BaseURL = 'https://api.github.com/'
const instance = axios.create({
    baseURL: BaseURL
})

//request interceptor
instance.interceptors.request.use((config) => {
    return config;
}, (error) => {
    return Promise.reject(error);
});

//response interceptor
instance.interceptors.response.use((response)=>{
    return response
}, (error)=>{
    return Promise.reject(error);
})

class Networking{
    getUserProfile(userId){
        return instance.get('users/'+userId);
    }
    getUserFollowers(userId){
        return instance.get('users/'+userId+'/followers');
    }
    getUserFollowing(userId){
        return instance.get('users/'+userId+'/following');
    }
    getUserRepos(userId){
        return instance.get('users/'+userId+'/repos');
    }
    getRepoLanguage(repoName, userId){
        return instance.get('repos/'+userId+'/'+repoName+'/languages')
    }
}

export default new Networking()