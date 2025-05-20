
interface EnvUrl {
  gxp: string;
  keyClock: string;
  ws: string;
}

const environments: Record<EnvTypes, EnvUrl> = {
  dev: {
    gxp: 'https://api.guader.net',
    keyClock: 'http://192.168.110.5:28080',
    ws: 'ws://192.168.110.5:8000/ws/instruction',
  },
  mock: {
    gxp: 'http://rap2api.taobao.org/app/mock/300907',
    keyClock: 'http://192.168.110.5:28080',
    ws: 'ws://192.168.110.5:8000/ws/instruction',
  },
  test: {
    gxp: 'https://ems.hygealeo.com',
    keyClock: 'https://ems.hygealeo.com',
    ws: 'wss://ems.hygealeo.com:8083/ws/instruction',
  },
};
const ENV: EnvTypes = import.meta.env.VITE_ENV;

const environment: EnvUrl = environments[ENV || 'dev'];

export { environments, environment, ENV };