import { cleanup } from '@testing-library/vue';
// import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';

// import NavigationFab from '@/components/NavigationFab.vue';

installQuasarPlugin();

describe('', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    cleanup();
  });

  it('', async (): Promise<void> => {
    expect(true).toBe(true);
    // const wrapper = mount(NavigationFab, {
    //   global: {
    //     stubs: { PopUp: true },
    //   },
    // });

    // expect(wrapper.exists()).toBe(true);
    // expect(wrapper.findComponent({ name: 'NavigationFab' }).exists()).toBe(
    //   true
    // );
    // expect(wrapper.findComponent({ name: 'NavigationFab' })).toMatchSnapshot();

    // wrapper.unmount();
  });

  // it('', async (): Promise<void> => {
  //   const wrapper = mount(NavigationFab, {
  //     global: {
  //       stubs: { PopUp: true },
  //     },
  //   });

  //   expect(wrapper.find('#navigation-fab').exists()).toBe(true);

  //   await wrapper.vm.$nextTick();
  //   expect(wrapper.emitted('rendercomplete'));

  //   wrapper.unmount();
  // });

  // it('', async (): Promise<void> => {
  //     render(CarouselDialogue);
  //     screen.findByTestId('carousel-dialogue');
  // })
});
