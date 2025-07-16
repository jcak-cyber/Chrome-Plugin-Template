import { createApp } from "vue";
import { createHMRManager } from "../utils/hrmEvent";

import "./style.scss";
import App from "./App.vue";
import createPiniaPlugin from "../stores/deploy/createPinia";

let app: ReturnType<typeof createApp> | null = null;

const initApp = () => {
  if (app) {
    app.unmount();
  }

  app = createApp(App);
  createPiniaPlugin(app);
  app.mount("#app");
};

if (import.meta.env.MODE === "development") {
  const { connect } = createHMRManager(initApp);
  connect();
} else {
  initApp();
}
