import {
  Button, ConfigProvider
} from 'ant-design-vue';
const plugins = [Button, ConfigProvider];

export const setupAntd = (app: any, options = {}) => {
  // app.config.globalProperties.$msg = message;
  plugins.forEach((plugin) => {
    app.use(plugin);
  });
};