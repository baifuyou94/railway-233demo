import { ENV, environments } from '@/contants/environments';

// mock请求处理
const mockDeal = (ctx) => {
  if (ENV === 'mock' || ctx.req.url.includes(environments.mock.gxp)) { // mock情况下，所有code先1
    ctx.res.code = 1;
    switch(ctx.req.options.url) {
      case '/admin/v1/user_info': // 如果是用户权限接口， 该接口权限为 super
        ctx.res.data.user.super = true;
      break;
      case '/admin/v1/user_login': // 处理token中文问题
        ctx.res.data.loginRes ={
          accessToken: "2222",
          avatar: "",
          id: "11",
          name: "mock",
          refreshToken: "1111",
        }
      break;
    }
 }
}

const mockBefore = (ctx) => {
  const isMockBase = localStorage.getItem('isMock');
  const isMock = isMockBase === 'true';
  const mockUrls = localStorage.getItem('mockUrls');
  if (mockUrls) {
    const urls = JSON.parse(mockUrls);
    if (urls.includes(ctx.req.options.url) || isMock) {
      // 改请求地址为mock地址
      ctx.req.originUrl = `${environments.mock.gxp}${ctx.req.options.url}`;
      ctx.req.url = `${environments.mock.gxp}${ctx.req.options.url}`;
    }
  }
}

export {
  mockDeal,
  mockBefore,
};