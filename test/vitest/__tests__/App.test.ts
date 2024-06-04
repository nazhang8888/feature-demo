import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { createTestingPinia } from '@pinia/testing';

import { installRouter } from './mocks/install-router';

import App from '@/App.vue';

installQuasarPlugin();
Object.defineProperty(window, 'localStorage', {
  value: localStorage as Storage,
});

installRouter({
  spy: { create: (fn) => vi.fn(fn), reset: (spy) => spy.mockClear() },
});

describe('App.vue', (): void => {
  it('should mount the main layout', async (): Promise<void> => {
    const wrapper = mount(App, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
            createSpy: vi.fn(),
          }),
        ],
      },
    });
    expect(wrapper.vm).not.toBeNull();
    expect(wrapper.vm.$route.path).toBe('/');
  });
});
