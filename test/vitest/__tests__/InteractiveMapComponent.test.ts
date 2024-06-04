import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { createTestingPinia } from '@pinia/testing';

import { useMapStore } from '@/stores/mapStore';
import { useTableStore } from '@/stores/tableStore';

import { installRouter } from './mocks/install-router';

import InteractiveMapComponent from '@/components/InteractiveMap.vue';

import type { Mock } from 'vitest';
import type { Store, StoreDefinition } from 'pinia';
import { ComputedRef } from 'vue';

function mockedStore<TStoreDef extends () => unknown>(
  useStore: TStoreDef
): TStoreDef extends StoreDefinition<
  infer Id,
  infer State,
  infer Getters,
  infer Actions
>
  ? Store<
      Id,
      State,
      Record<string, never>,
      {
        [K in keyof Actions]: Actions[K] extends (
          ...args: infer Args
        ) => infer ReturnT
          ? // 👇 depends on your testing framework
            Mock<Args, ReturnT>
          : Actions[K];
      }
    > & {
      [K in keyof Getters]: Getters[K] extends ComputedRef<infer T> ? T : never;
    }
  : ReturnType<TStoreDef> {
  return useStore() as any;
}

installQuasarPlugin();
Object.defineProperty(window, 'localStorage', {
  value: localStorage as Storage,
});
installRouter({
  spy: { create: (fn) => vi.fn(fn), reset: (spy) => spy.mockClear() },
});

describe('InteractiveMap Component', () => {
  it('should mount the interactive map component', async (): Promise<void> => {
    const ResizeObserverMock = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));

    vi.stubGlobal('ResizeObserver', ResizeObserverMock);

    const wrapper = mount(InteractiveMapComponent, {
      global: {
        stubs: { PopUp: true },
        plugins: [
          createTestingPinia({
            // stubActions: false,
            createSpy: vi.fn(),
          }),
        ],
      },
    });
    const mapStore = mockedStore(useMapStore);
    const tableStore = useTableStore();
    expect(mapStore).not.toBeNull();
    expect(tableStore).not.toBeNull();
    expect(mapStore.setMap).toBeCalledTimes(1);
    expect(wrapper.vm).not.toBeNull();
  });
});
