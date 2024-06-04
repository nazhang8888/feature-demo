import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { Notify } from 'quasar';
import NotifyComponent from './NotifyComponent.vue';
import ExampleComponent from './ExampleComponent.vue';
import LayoutComponent from './LayoutComponent.vue';

installQuasarPlugin();

describe.skip('layout example', () => {
  it('should mount component properly', () => {
    const wrapper = mount(LayoutComponent);
    expect(wrapper.exists()).to.be.true;
  });
});

describe.skip('example Component', () => {
  it('should mount component with todos', async () => {
    const wrapper = mount(ExampleComponent, {
      props: {
        title: 'Hello',
        meta: {
          totalCount: 4,
        },
        todos: [
          { id: 1, content: 'Hallo' },
          { id: 2, content: 'Hoi' },
        ],
      },
    });
    expect(wrapper.vm.clickCount).toBe(0);
    await wrapper.find('.q-item').trigger('click');
    expect(wrapper.vm.clickCount).toBe(1);
  });

  it('should mount component without todos', () => {
    const wrapper = mount(ExampleComponent, {
      props: {
        title: 'Hello',
        meta: {
          totalCount: 4,
        },
      },
    });
    expect(wrapper.findAll('.q-item')).toHaveLength(0);
  });
});

describe.skip('notify example', () => {
  it('should call notify on click', async () => {
    expect(NotifyComponent).toBeTruthy();

    const wrapper = mount(NotifyComponent);
    const spy = vi.spyOn(Notify, 'create');
    expect(spy).not.toHaveBeenCalled();
    await wrapper.trigger('click');
    expect(spy).toHaveBeenCalled();
  });
});
