import { store } from "quasar/wrappers";
import { createPinia } from "pinia";

export default store((/* { ssrContext } */) => {
  const pinia = createPinia();
  // e.g. pinia.use(SomePiniaPlugin)

  return pinia;
});
