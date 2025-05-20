import { defineStore } from 'pinia'
// servers List数据
import { message } from 'ant-design-vue';
import router  from '@/router';
import { PERMISSION_OBJ } from '@/contants/permissions';
import { attrToObj } from '@/utils/format';

interface MyProps {
  isSuper: boolean,
  permissionIdList: string[],
  userData: Record<string, any>,
  serviceList: any,
  serviceListObj: Record<string, any>,
  childInfo: Record<string, any>, // 子路由下的基础数据
}

const childrenId = ['/tenement/'];  // 需要检测子路由id的模块

export default defineStore('main', {
  state: (): MyProps => ({
    isSuper: false,
    userData: {},
    permissionIdList: [],
    serviceList: [],
    serviceListObj: {},
    childInfo: {
      name: '六顺科技',
      backPath: '/tenementM',
    },
  }),
  getters: {
    routeChildId() { // 子路由id
      let result = '';
      const { currentRoute }: any = router || {};
      const { path } = currentRoute?.value || {};
      childrenId.forEach(item => {
        if (path.includes(item)) {
          let pathNew = path.split(item)[1];
          result = pathNew.split('/')[0];
        }
      });
      return result;
    },
  },
  actions: {
    async init(id?: string) {
     
    }
  },
})
