// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

// 后台用户-创建
export async function AdminBackendUserAdd(
  body: API.v1BackendUserAddReq,
  options?: { [key: string]: any },
) {
  return request<API.v1UserAddRes>('/admin/v1/backend_user_add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
