import { ref } from 'vue';
import { render, screen, fireEvent, cleanup } from '@testing-library/vue';
import { DOMWrapper, mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
// import { withSetup } from '../test-utils/utils';
import CarouselDialogue from '@/components/CarouselDialogue.vue';
import { QCarousel, QDialog } from 'quasar';

installQuasarPlugin({
  components: {
    // QDialog,
    // QCarousel,
  },
});

describe('CarouselDialogue Component', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    cleanup();
  });

  it('should render the component', async (): Promise<void> => {
    const wrapper = mount(CarouselDialogue, {});

    expect(wrapper.findComponent({ name: 'CarouselDialogue' }).exists()).toBe(
      true
    );

    wrapper.unmount();
  });

  it('should emit rendercompleted', async (): Promise<void> => {
    const wrapper = mount(CarouselDialogue, {});

    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('rendercomplete'));

    wrapper.unmount();
  });

  it('should open the dialog', async (): Promise<void> => {
    const wrapper = mount(CarouselDialogue, {
      setup() {
        const carousel = ref(false);
        const slide = ref(1);

        return {
          carousel,
          slide,
        };
      },
      global: {
        stubs: {
          teleport: true,
        },
      },
    });

    const button = wrapper
      .findComponent({ name: 'CarouselDialogue' })
      .find('button');

    expect(button.exists()).toBe(true);

    await button.trigger('click');
    await wrapper.vm.$nextTick();

    const dialog = wrapper.find('.q-dialog');
    expect(dialog.exists()).toBe(true);
    expect(dialog.html().includes('q-dialog'));
  });

  it('should have clickable buttons', async (): Promise<void> => {
    // const ParentComponent = {
    //   template: `
    //     <q-dialog v-model="carousel">
    //       <q-carousel v-model="slide" />
    //     </q-dialog>
    //   `,
    //   components: { CarouselDialogue },
    //   setup() {
    //     const carousel = ref(false);
    //     const slide = ref(1);

    //     return { carousel, slide };
    //   },
    // };

    // const wrapper = mount(
    //   ParentComponent
    // , {
    // global: {
    // stubs: {
    //   teleport: true,
    // },
    // },
    // }
    // );

    const node = document.createElement('div');
    node.setAttribute('id', 'app');
    document.body.appendChild(node);

    const wrapper = mount(CarouselDialogue, {
      attachTo: '#app',
      setup() {
        const carousel = ref(false);
        const slide = ref(1);

        return { carousel, slide };
      },
    });

    const documentWrapper = new DOMWrapper(document.body);
    const carousel = documentWrapper.find('.q-dialog');

    // console.log(carousel);
    // expect(carousel.exists()).toBeTruthy();

    // mount(CarouselDialogue, {
    //   //   data: () => ({
    //   //     carousel: true,
    //   //   }),
    //   setup() {
    //     const carousel = ref(true);
    //     const slide = ref(1);
    //     return {
    //       carousel,
    //       slide,
    //     };
    //   },
    //   // global: {
    //   //   stubs: {
    //   //     teleport: true,
    //   //   },
    //   // },
    // });

    // const portal = wrapper.find('q-portal--dialog--1');

    // console.log(wrapper.html());

    // expect(wrapper.find('.q-dialog').html()).toContain(
    //   'Custom dialog which should be tested'
    // );

    // const findSelect = () => wrapper.findComponent({ ref: 'slide' });
    // await findSelect().vm.$emit('update:model-value', '2');

    // expect(wrapper.vm.carousel).toBe(false);
    // expect(wrapper.vm.slide).toBe(1);

    // console.log(wrapper.html());

    // const button = wrapper.find('button');
    // await button.trigger('click');
    // await wrapper.vm.$nextTick();

    // expect(button.exists()).toBe(true);

    // await button.trigger('click');
    // await wrapper.vm.$nextTick();

    // const carouselButton = wrapper
    //   .findComponent({ name: 'CarouselDialogue' })
    //   .find('button');

    // expect(carouselButton.exists()).toBe(true);
    // await carouselButton.trigger('click');

    // expect(wrapper.vm.slide).toBe(2);

    // document.body.innerHTML = ''

    // wrapper.unmount();
  });
});
