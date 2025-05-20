// An highlighted block
/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
 import { extend } from 'umi-request';
 import router  from '@/router';
 import { notification } from 'ant-design-vue';
 import { getAccessToken } from '@/utils';
 // code 码国际化
//  import { getIntl } from 'umi';
 import { environment, ENV } from '@/contants/environments';
 import {requsetCode} from '@/contants/requsetCode';
 import { mockDeal, mockBefore } from './mockRequsetDeal';
 // console.log(getIntl().formatMessage({id:'component.order'}))
//  const isDev = process.env.NODE_ENV === 'development';
 
 const codeMessage: Record<number, string> = {
   200: '服务器成功返回请求的数据。',
   201: '新建或修改数据成功。',
   202: '一个请求已经进入后台排队（异步任务）。',
   204: '删除数据成功。',
   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
   401: '登录过期，重新登录',
   403: '用户权限不足',
   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
   406: '请求的格式不可得。',
   410: '请求的资源被永久删除，且不会再得到的。',
   422: '当创建一个对象时，发生一个验证错误。',
   500: '服务器发生错误，请检查服务器。',
   502: '网关错误。',
   503: '服务不可用，服务器暂时过载或维护。',
   504: '网关超时。',
   10003:'登录过期，重新登录'
 };
 
 /**
  * 异常处理程序
  */
 const errorHandler = async (error: any) => {
   const { response } = error;
   if (response && response.status) {
    if (response.status === 401) {
      //  await logout();
      return {
      code: response.status,
      message: codeMessage[response.status],
      };
    }
    const errorText = codeMessage[response.status] || response.statusText;
    notification.error({
      duration: 30,
      message: errorText,
      description: '',
    });
    return {
      code: response.status,
      message: codeMessage[response.status],
    };
   }
   return error;
 };
 const request = extend({
   errorHandler,
   timeout: 150000, // 网络延迟 2分钟
   // 默认错误处理
   // credentials: 'include', // 默认请求是否带上cookie
   credentials: 'omit',
 });
 
 // request拦截器, 改变url 或 options.
/* @ts-ignore disable-next-line */ 
 request.interceptors.request.use(async(url, options) => {
   const c_token = await getAccessToken() 
   const urlNew = url.includes('http') ? url: `${environment.gxp}${url}`;
   if (c_token) {
	 const headers = {
	   Authorization: `Bearer ${c_token}`,
	   // 'Access-Control-Allow-Origin': '*',
	   // mode: "no-cors"
	 };
	 return {
	   url: urlNew,
	   options: { ...options, headers },
	 };
   }
   return {
	 url: urlNew,
	 options: { ...options },
   };
 });
//  返回值处理
 request.use(async (ctx, next) => {
  mockBefore(ctx);
   await next();
   mockDeal(ctx); // mock情况下，处理下数据
   if (ctx.res && ctx.res.code !== 1) {
      if(ctx.res.code == 10003){
          router.push('/login');
      }
      if (ctx.res.code >= 1000) {
        ctx.res.message = requsetCode[ctx.res.code] || ctx.res.message;
      }   
    }
  //  sessionStorage.setItem('sessionTime', new Date().getTime() + '');
 });
 
 export default request;