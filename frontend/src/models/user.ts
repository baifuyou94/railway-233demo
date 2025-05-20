
import { defineStore } from 'pinia';
import router  from '@/router';

interface LoginParams {
    loginName: string;
    password: string;
  }

export const useUserStore = defineStore({
  id: 'app-user',
  state: () => ({
    // accessToken 用于用户认证
    // refreshToken 出登陆需要用的token
    accessToken:'',
    refreshToken:'',
    userInfo: null,
  }),
  getters: {
    getAccessToken(): string|null {
      return this.accessToken || localStorage.getItem('accessToken')
    },

    getFreshToken(): string|null {
      return this.refreshToken || localStorage.getItem('refreshToken')
    },
  },
  actions: {
    setAccessToken(token: string ) {
      this.accessToken = token ? token : ''; // for null or undefined value
      localStorage.setItem('accessToken',token)
    },

    setFreshToken(token: string ) {
      this.refreshToken = token ? token : ''; // for null or undefined value
      localStorage.setItem('refreshToken',token)
    },

    setUserInfo(info: any) {
      this.userInfo = info;
      localStorage.setItem('userInfo',JSON.stringify(info)) 
    },

    async login(params: LoginParams) : Promise<any>{
      try {
        const { password,loginName } = params;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async logout() {

      // 执行注销请求 
      router.push('/login');
      this.setFreshToken('');
      this.setAccessToken('');
      this.setUserInfo(null);
    },
    
  },
});


