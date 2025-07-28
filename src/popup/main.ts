import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import createPiniaPlugin from "../stores/deploy/createPinia";

// 声明全局变量
declare global {
  const __HMR_ENABLED__: boolean;
}

let app: ReturnType<typeof createApp> | null = null;

const initApp = () => {
  if (app) {
    app.unmount();
  }

  app = createApp(App);
  createPiniaPlugin(app);
  app.mount("#app");
};

// 使用全局变量确保热更新代码在生产环境被完全排除
if (typeof __HMR_ENABLED__ !== "undefined" && __HMR_ENABLED__) {
  // 动态导入热更新模块，确保生产环境不会包含这些代码
  import("../utils/hrmEvent").then(({ createHMRManager }) => {
    const { connect } = createHMRManager(initApp);
    connect();
  });
} else {
  initApp();
}
