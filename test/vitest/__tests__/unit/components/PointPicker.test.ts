import { cleanup } from '@testing-library/vue';
// import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';

// import PointPicker from '@/components/PointPicker.vue';
import { installResizeObserver } from '../../__mocks__/install-resize-observer';

describe('', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  installQuasarPlugin();

  installResizeObserver();

  afterEach(() => {
    cleanup();
  });

  it('', async (): Promise<void> => {
    expect(true).toBe(true);
    // const wrapper = mount(PointPicker, {
    //   global: {
    //     stubs: { PopUp: true },
    //   },
    // });
    // expect(wrapper.exists()).toBe(true);
    // expect(wrapper.findComponent({ name: 'PointPicker' }).exists()).toBe(true);
    // expect(
    //   wrapper.findComponent({ name: 'PointPicker' }).exists()
    // )
    // wrapper.unmount();
  });

  // it('', async (): Promise<void> => {
  //   const wrapper = mount(PointPicker, {
  //     global: {
  //       stubs: { PopUp: true },
  //     },
  //   });

  //   expect(wrapper.find('#point-picker').exists()).toBe(true);

  //   await wrapper.vm.$nextTick();
  //   expect(wrapper.emitted('rendercomplete'));

  //   wrapper.unmount();
  // });

  // it('', async (): Promise<void> => {
  //     render(CarouselDialogue);
  //     screen.findByTestId('carousel-dialogue');
  // })
});
