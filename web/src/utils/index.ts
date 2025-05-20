
// 开发环境莫名，路由后面会跟 “/”，这里处理下
const dealPathName = (pathname?: string) => {
  return pathname ? pathname.replace(/[&\/]$/, '') : '';
};
// 获取页面类型
const getPageType = () => {
  const { location }: any = history;
  const { pathname } = location || {};
  const attrs = dealPathName(pathname || '').split('/');
  return attrs[attrs.length - 1];
};

// 获取token
const getAccessToken=()=> {
  const accessToken = localStorage.getItem('accessToken');
  return accessToken
}

export {
  dealPathName,
  getPageType,
  getAccessToken
}