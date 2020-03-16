import { mount, waitTime } from '@suning/v-test-utils';
import UxBacktop from '../index';

// build a test area here
it('render and backtop correctly', async () => {
  const wrapper = mount(
    {
      template: `
        <div style="height: 400px" ref="outerContainer">
          <div style="height: 1200px"></div>
          <ux-backtop :visibilityHeight="200" :getTarget="getTarget" ref="backtopRef" />
        </div>
      `,
      components: {
        UxBacktop,
      },
      methods: {
        getTarget() {
          return this.$refs.outerContainer;
        },
      },
    },
    {
      attachToDocument: true,
      sync: false,
    }
  );
  const outerContainer = wrapper.find({ ref: 'outerContainer' });
  const backtopElement = wrapper.find({ ref: 'backtopRef' });
  expect(backtopElement.element.style.display).toBe('none');
  outerContainer.element.scrollTop = 201;
  backtopElement.vm.handleScroll();
  await waitTime(200);
  expect(backtopElement.element.style.display).toBe('');
  backtopElement.trigger('click');
  await waitTime(500);
  expect(Math.abs(Math.round(outerContainer.element.scrollTop))).toBe(0);
  wrapper.destroy();
});

it('target is window and render correctly', async () => {
  const wrapper = mount(
    {
      template: `
        <div class="demo"
             style="height:1500px">
          <ux-backtop ref="backtopRef"/>
        </div>
      `,
      components: {
        UxBacktop,
      },
    },
    {
      attachToDocument: true,
      sync: false,
    }
  );
  const backtopElement = wrapper.find({ ref: 'backtopRef' });
  expect(backtopElement.element.style.display).toBe('none');
  window.pageYOffset = 800;
  backtopElement.vm.handleScroll();
  await waitTime(500);
  expect(backtopElement.element.style.display).toBe('');
  backtopElement.trigger('click');
  await waitTime(500);
  wrapper.destroy();
});
