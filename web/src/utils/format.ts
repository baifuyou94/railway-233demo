// 处理数据，数据转化

interface AttrToObjType {
  value_obj?: boolean;
  key?: string;
  value?: string;
}
// 数组转化为键值对
const attrToObj = <T>(
  attr: T[],
  obj: AttrToObjType = { key: 'key', value: 'value', value_obj: false },
  check: (data: T) => boolean = () => true,
  dealValue?: (data: T) => any,
) => {
  const result: any = {};
  (attr || []).forEach((item: any) => {
    if (check(item)) {
      const valueNew = dealValue
        ? dealValue(item[obj.value || 'value'])
        : item[obj.value || 'value'];
      result[item[obj.key || 'key']] = obj.value_obj ? item : valueNew;
    }
  });
  return result;
};

const defaultTreeProps = {   //配置项
  id: 'key',
  parentKey: 'parentId',
  name: 'title',
  children: 'children',
  rootValue: "0",
  stopKey: 'type',// 停止位
  stopValue: 'sdfadfytuya',// 停止值
};
const attr2Tree = (list: any[], treeProps = defaultTreeProps , root?: any) => {
 if (!root) {
     root = {};
     root[treeProps.id] = treeProps.rootValue;
     root[treeProps.children] = [];
 }
 if (list && list.length > 0) {
    let children = root[treeProps.children];
    list.forEach(node => {
      if (node[treeProps.parentKey] === root[treeProps.id]) {
        if (!children) {
            children = [];
            root[treeProps.children] = children;
        }
        let copyNode: Record<string, any> = {};
        copyNode[treeProps.id] = node.id; 
        copyNode[treeProps.parentKey] = node.parentId;
        copyNode[treeProps.name] = node.name;
        copyNode[treeProps.children] = node[treeProps.children];
        copyNode[treeProps.stopKey] = node[treeProps.stopKey];
        children.push(copyNode);
      }
    });
    if (children && children.length > 0) {
      list = list.filter(item1 => !children.some((item2: any) => item2[treeProps.id] === item1[treeProps.id]));
      children.forEach((node: any) => {
        if (root[treeProps.stopKey] !== treeProps.stopValue) {
          // 递归
          attr2Tree(list, treeProps, node);
        }
      });
    }
      return root.children;
   } else {
      return root.children;
   }

}


export {
  attrToObj,
  attr2Tree,
}