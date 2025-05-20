import { attrToObj } from '@/utils/format';
// 权限和 url对应关系
const PERMISSION = [
  // 留一个 做例子
  { key: '7', value: '/tenementM' },
];

const PERMISSION_OBJ = attrToObj(PERMISSION);

export {
  PERMISSION,
  PERMISSION_OBJ
};