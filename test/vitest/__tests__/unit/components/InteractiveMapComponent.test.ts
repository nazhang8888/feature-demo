// import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';

import { installRouter } from '../../__mocks__/install-router';
// import TabulatorMock from '../__mocks__/tabulator';

import InteractiveMapComponent from '@/components/InteractiveMap.vue';
// import PopUpComponent from '@/components/PopUp.vue';

import { render, screen, fireEvent, cleanup } from '@testing-library/vue';
import { installResizeObserver } from '../../__mocks__/install-resize-observer';

installQuasarPlugin();

installResizeObserver();

installRouter({
  spy: { create: (fn) => vi.fn(fn), reset: (spy) => spy.mockClear() },
});

Object.defineProperty(window, 'localStorage', {
  value: localStorage as Storage,
});

describe('InteractiveMap Component', () => {
  beforeEach(() => {
    setActivePinia(createPinia());

    // const ResizeObserverMock = vi.fn(() => ({
    //   observe: vi.fn(),
    //   unobserve: vi.fn(),
    //   disconnect: vi.fn(),
    //   }));

    // installResizeObserver();

    // vi.stubGlobal('ResizeObserver', ResizeObserverMock);

    // vi.stubGlobal('Tabulator', TabulatorMock);
  });

  afterEach(() => {
    cleanup();
  });

  it('should mount the interactive map component', async (): Promise<void> => {
    const wrapper = mount(InteractiveMapComponent, {
      global: {
        stubs: { PopUp: true },
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'InteractiveMap' }).exists()).toBe(
      true
    );
    expect(wrapper.findComponent({ name: 'InteractiveMap' })).toMatchSnapshot();

    wrapper.unmount();
  });

  it('should render the map', async (): Promise<void> => {
    const wrapper = mount(InteractiveMapComponent, {
      global: {
        stubs: { PopUp: true },
      },
    });

    expect(wrapper.find('#map-container').exists()).toBe(true);

    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('rendercomplete'));

    wrapper.unmount();
  });

  it('should render the popup', async (): Promise<void> => {
    // const { debug } = render(InteractiveMapComponent);
    // debug();

    render(InteractiveMapComponent);
    screen.findByTestId('map-container');

    const map = screen.findByTestId('map-container');

    await fireEvent.click(await map);

    const popup = screen.findByTestId('popup-container');

    screen.findByText('HDMS');
  });

  // it('should render a table', async (): Promise<void> => {

  // })

  it('should check if dark is active', async (): Promise<void> => {
    const wrapper = mount(InteractiveMapComponent, {
      global: {
        stubs: { PopUp: true },
        plugins: [installQuasarPlugin],
      },
    });

    // console.log(wrapper.vm.$q.dark.isActive);

    expect(wrapper.vm.$q.dark.isActive).toBe(false);

    wrapper.vm.$q.dark.toggle();

    expect(wrapper.vm.$q.dark.isActive).toBe(true);

    expect;

    wrapper.unmount();
  });

  it('should emit an event when the map is clicked', async (): Promise<void> => {
    const wrapper = mount(InteractiveMapComponent, {});

    await wrapper.findComponent({ name: 'InteractiveMap' }).trigger('click');

    expect(wrapper.emitted('map-clicked'));

    wrapper.unmount();
  });

  it('should zoom to a coordinate when the map is right clicked'),
    async (): Promise<void> => {
      const wrapper = mount(InteractiveMapComponent, {});

      await wrapper
        .findComponent({ name: 'InteractiveMap' })
        .trigger('right-click');

      expect(wrapper);
    };
});
