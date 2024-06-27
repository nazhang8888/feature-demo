import { createApp } from 'vue';

export function withSetup<T>(hook: () => T) {
  let result;

  const app = createApp({
    setup() {
      result = hook();
      return () => {
        /* Add your code here */
      };
    },
  });

  app.mount(document.createElement('div'));

  return [result, app];
}
