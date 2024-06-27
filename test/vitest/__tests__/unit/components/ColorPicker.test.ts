import { cleanup } from '@testing-library/vue';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';

import ColorPicker from '@/components/ColorPicker.vue';

installQuasarPlugin();

describe('ColorPicker Component', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    cleanup();
  });

  it('should render the component', async (): Promise<void> => {
    const wrapper = mount(ColorPicker);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'ColorPicker' }).exists()).toBe(true);

    wrapper.unmount();
  });

  it('it should emit rendercompleted', async (): Promise<void> => {
    const wrapper = mount(ColorPicker);

    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('rendercomplete'));

    wrapper.unmount();
  });

  it('should update the input field', async (): Promise<void> => {
    const wrapper = mount(ColorPicker);

    await wrapper.findComponent('.my-picker').trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('click'));

    const input = wrapper.findComponent('.my-picker').find('input');
    input.setValue('#ff00ff');
    await wrapper.vm.$nextTick();

    expect(input.element.value).toBe('#ff00ff');

    wrapper.unmount();
  });
});
