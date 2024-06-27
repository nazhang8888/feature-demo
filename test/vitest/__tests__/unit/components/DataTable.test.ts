import { cleanup } from '@testing-library/vue';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';

import DataTable from '@/components/DataTable.vue';
import { ref } from 'vue';

installQuasarPlugin();

describe('DataTable Component', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    cleanup();
  });

  it('should mount the data table component', async (): Promise<void> => {
    const wrapper = mount(DataTable, {
      setup() {
        const selected = ref();
        return { selected };
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'DataTable' }).exists()).toBe(true);

    wrapper.unmount();
  });

  it('should update the ref', async (): Promise<void> => {
    const ParentComponent = {
      template: '<DataTable v-model:selected="selected" />',
      components: { DataTable },
      setup() {
        const selected = ref([]);
        return { selected };
      },
    };

    const wrapper = mount(ParentComponent);

    const table = wrapper.findComponent({ name: 'QTable' });
    const rows = table.findAll('.q-checkbox');
    const firstRow = rows[1];
    const secondRow = rows[2];

    await firstRow.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.selected).toMatchInlineSnapshot(`
      [
        {
          "caliber": "5.56x45mm NATO",
          "id": 1,
          "name": "M855",
          "origin": "US",
        },
      ]
    `);

    await secondRow.trigger('click');
    expect(wrapper.vm.selected).toMatchInlineSnapshot(`
      [
        {
          "caliber": "5.56x45mm NATO",
          "id": 1,
          "name": "M855",
          "origin": "US",
        },
        {
          "caliber": "7.62x51mm NATO",
          "id": 2,
          "name": "7.62x51mm NATO",
          "origin": "US",
        },
      ]
    `);

    await firstRow.trigger('click');
    expect(wrapper.vm.selected).toMatchInlineSnapshot(`
      [
        {
          "caliber": "7.62x51mm NATO",
          "id": 2,
          "name": "7.62x51mm NATO",
          "origin": "US",
        },
      ]
    `);

    wrapper.unmount();
  });
});
