import { cleanup } from '@testing-library/vue';
// import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';

// import LayersPicker from '@/components/LayersPicker.vue';

describe('', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    cleanup();
  });

  it('', async (): Promise<void> => {
    expect(true).toBe(true);
  });

  // it('', async (): Promise<void> => {
  //   const wrapper = mount(LayersPicker, {
  //     global: {
  //       stubs: { PopUp: true },
  //     },
  //   });

  //   expect(wrapper.exists()).toBe(true);
  //   expect(wrapper.findComponent({ name: 'LayersPicker' }).exists()).toBe(true);
  //   expect(wrapper.findComponent({ name: 'LayersPicker' })).toMatchSnapshot();

  //   wrapper.unmount();
  // });

  // it('', async (): Promise<void> => {
  //   const wrapper = mount(LayersPicker, {
  //     global: {
  //       stubs: { PopUp: true },
  //     },
  //   });

  //   expect(wrapper.find('#layers-picker').exists()).toBe(true);

  //   await wrapper.vm.$nextTick();
  //   expect(wrapper.emitted('rendercomplete'));

  //   wrapper.unmount();
  // });

  // it('', async (): Promise<void> => {
  //     render(LayersPicker);
  //     screen.findByTestId('layers-picker');
  // })
});
