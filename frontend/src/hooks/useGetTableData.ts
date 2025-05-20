import { computed, watchEffect } from 'vue';
import { message } from 'ant-design-vue';
import { usePagination } from 'vue-request';

interface MyProps {
  noMeta?: boolean;
  [key: string]: any;
}

export default function(servers: any = new Promise((resolve) => {resolve(true)}),{ noMeta, ...options }: MyProps = { noMeta: false }, juir?: any) {
    const {
        data,
        run: run2,
        loading,
        current,
        pageSize,
      } = usePagination((params) => {
          const { page, size, ...pro } = params || {};
          let newParam = noMeta ? params : { ...pro, meta: { page, size  } };
          return servers(newParam);
        }, {
        manual: juir!== undefined,
        formatResult: (res: any) => {
           const { code, message: msg, data } = res || {};
           if (code !== 1) {
                message.error(msg || '获取列表数据失败');
                return [];
           } else {
                return data?.list || [];
           }
        },
        pagination: {
          currentKey: 'page',
          pageSizeKey: 'size',
        },
        ...options,
      });
      const pagination = computed(() => ({
        total: 0,
        showQuickJumper: true,
        showLessItems: true,
        current: current.value,
        pageSize: pageSize.value,
      }));

      const run = (params?: any) => {
        run2({
          page: current.value,
          size: pageSize.value, 
          ...params })
      }
      // 有权限判断时，根据权限判断，进行初始访问数据
      watchEffect(() => {
        if (juir?.value?.get && !loading.value && !data?.value) {
          run2({
            page: current.value,
            size: pageSize.value,
          });
        }
      })
      return {
        data,
        run,
        loading,
        current,
        pageSize,
        pagination,
      };
}