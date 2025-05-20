declare namespace API {
  /* Contact */
  type adminpbv1Contact = 0 | 1 | 2 | 3;

  type adminpbv1Response = {
    code?: v1Code;
    message?: string;
  };

  /* AccountType 账号类型
 - 0: 未知
 - 1: 后台
 - 2: 前台
  */
  type v1AccountType = 0 | 1 | 2;

  type v1BackendUserAdd = {
    id?: string;
    loginName?: string;
    name?: string;
    roleId?: string[];
    phone?: string;
    email?: string;
    frontendEnable?: boolean;
    enable?: boolean;
  };

  type v1BackendUserAddReq = {
    user?: v1BackendUserAdd;
  };

  type v1BackendUserUpdateReq = {
    user?: v1BackendUserAdd;
  };

  /* Code 返回码
 - 0: 错误
 - 1: 成功
 - 10003: admin服务
   ErrAdminLoginFailed = 10001; // todo fix 可能要细化到具体登陆错误
   ErrCreateTenantFailed = 10002;
 - 90001: 参数错误
 - 90002: 已存在
 - 90003: 未找到
 - 90004: 无权限
 - 90005: 禁止访问
 - 100001: 数据库未初始化元数据未，如：事件触发时机枚举值，联系方式等
  */
  type v1Code = 0 | 1 | 10003 | 90001 | 90002 | 90003 | 90004 | 90005 | 100001;

  type v1UserAddRes = {
    code?: v1Code;
    message?: string;
    data?: v1UserAddResData;
  };

  type v1UserAddResData = {
    id?: string;
  };
}
