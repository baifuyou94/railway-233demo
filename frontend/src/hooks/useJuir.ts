import { ref, watchEffect , toRaw } from 'vue';
import { useCommomStore } from '@/models';
import { useRouter } from "vue-router";

type jKeyType = 'add'| 'edit'| 'delete'| 'get';
interface MyProps {
  jKey?: jKeyType | string;
  canChecked?: (jFun: (jkey: string) => boolean) => void;
}
// 目前，已有的 操作权限类型
const baseKeys: jKeyType[] = ['add', 'edit', 'delete', 'get'];

let isFirst: any = undefined;

export default (props: MyProps) => {
  const {
    jKey = '',
    canChecked = () => {},
  } = props || {};
  const { currentRoute }: any = useRouter();
  const { path } = currentRoute.value || {};
  const commonStore = useCommomStore();
  const jOk = ref<boolean>(false);

  const jObj = ref<Record<string, any>>({});

  watchEffect(() => {
    const { permissionIdList, isSuper } = commonStore;
      // jobj 的方式
      const jObjNew = {};
      jObjNew[path] =isSuper || toRaw(permissionIdList).includes(path);
      baseKeys.forEach((item: string) => {
        const valueNow =isSuper || toRaw(permissionIdList).includes(`${path}/${item}`);
        jObjNew[item] = valueNow;
        jObjNew[`${path}/${item}`] = valueNow;
      });
      jObj.value = jObjNew;
      if (jKey) {
        jOk.value = !!jObjNew[jKey];
      } 
      if (![isFirst, '{}'].includes(JSON.stringify(jObjNew))) {
        isFirst = JSON.stringify(jObjNew);
        canChecked((jKeyInit: string) => { // template里面可以直接使用。 js内使用，可能不生效。需要写监听
          return !!jObjNew[jKeyInit];
        });
      } 
  });

  return {
    jOk,
    jObj, // js内使用，可能不生效。需要写监听这个对象来判断
    permissionIdList: commonStore.permissionIdList,
    isSuper: commonStore.isSuper,
    jFun: (jKeyInit: string) => { // template里面可以直接使用。 js内使用，可能不生效。需要写监听
      return !!jObj.value[jKeyInit];
    },
  }
}