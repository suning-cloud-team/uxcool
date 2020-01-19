import {
  mount, waitTime, removePopup, $
} from '@suning/v-test-utils';
import { UxDropdown, UxDropdownButton } from '..';
import Menu from '../../menu';

const triggerDropdownWrapper = (
  trigger = 'hover',
  closeOnSelect = true,
  visibleChangeFn = jest.fn(),
  overlayClickFn = jest.fn()
) => mount(
  {
    render() {
      return (
          <UxDropdown
            trigger={trigger}
            close-on-select={closeOnSelect}
            on-visible-change={visibleChangeFn}
            on-overlay-click={overlayClickFn}
          >
            <a slot="trigger">trigger element</a>
            <p slot="overlay" class="overlay">
              dropdown content
            </p>
          </UxDropdown>
      );
    },
  },
  {
    attachToDocument: true,
    sync: false,
  }
);

it('three trigger methods', async () => {
  const hoverWrapper = triggerDropdownWrapper();
  await waitTime(20);
  hoverWrapper.trigger('mouseenter');
  await waitTime(200);
  expect($('[role=align-popup]')[0]).not.toBeUndefined();
  expect($('[role=align-popup]')[0].getAttribute('display')).not.toBe('none');
  removePopup();

  const clickWrapper = triggerDropdownWrapper('click');
  await waitTime(20);
  clickWrapper.trigger('click');
  await waitTime(200);
  expect($('[role=align-popup]')[0]).not.toBeUndefined();
  expect($('[role=align-popup]')[0].getAttribute('display')).not.toBe('none');
  removePopup();

  const focusWrapper = triggerDropdownWrapper('focus');
  await waitTime(20);
  focusWrapper.trigger('focusin');
  await waitTime(200);
  expect($('[role=align-popup]')[0]).not.toBeUndefined();
  expect($('[role=align-popup]')[0].getAttribute('display')).not.toBe('none');
  removePopup();
});

it('render close on select correctly', async () => {
  const visibleChangeFn = jest.fn();
  const overlayClickFn = jest.fn();
  const clickWrapper = triggerDropdownWrapper('click', true, visibleChangeFn, overlayClickFn);
  clickWrapper.vm.$on('visible-change', visibleChangeFn);
  clickWrapper.vm.$on('overlay-click', overlayClickFn);
  await waitTime(20);
  clickWrapper.trigger('click');
  await waitTime(200);
  expect($('[role=align-popup]')[0]).not.toBeUndefined();
  expect($('[role=align-popup]')[0].style.display).not.toBe('none');
  expect(visibleChangeFn).toHaveBeenCalledTimes(1);
  $('.overlay').click();
  await waitTime(200);
  expect($('[role=align-popup]')[0].style.display).toBe('none');
  expect(visibleChangeFn).toHaveBeenCalledTimes(2);
  expect(overlayClickFn).toHaveBeenCalledTimes(1);
  removePopup();
});

it('render dropdown-button correctly', async () => {
  const clickFn = jest.fn();
  const wrapper = mount(UxDropdownButton, {
    slots: {
      overlay: 'popup content',
    },
    listeners: {
      click: clickFn,
    },
    attachToDocument: true,
    sync: false,
  });
  await waitTime(20);
  wrapper.find('button').trigger('click');
  await waitTime(200);
  expect(clickFn).toBeCalled();
  removePopup();
});

it('render dropdown-button disable correctly', async () => {
  const clickFn = jest.fn();
  const wrapper = mount(UxDropdownButton, {
    slots: {
      overlay: 'popup content',
    },
    propsData: {
      disabled: true,
    },
    listeners: {
      click: clickFn,
    },
    attachToDocument: true,
    sync: false,
  });
  await waitTime(20);
  wrapper.find('button').trigger('click');
  await waitTime(200);
  expect(clickFn).not.toBeCalled();
  removePopup();
});

it('render dropdown placement correctly', async () => {
  Object.defineProperty(HTMLButtonElement.prototype, 'offsetWidth', {
    get: () => 34
  });
  const wrapper = mount(UxDropdown, {
    slots: {
      trigger: '<button>testButton</button>',
      overlay: 'popup content',
    },
    propsData: {
      placement: 'topLeft',
      trigger: 'click',
      matchTriggerWidth: true
    },
    attachToDocument: true,
    sync: false,
  });
  await waitTime(20);
  wrapper.trigger('click');
  await waitTime(200);
  // console.log(wrapper.html());
  expect($('[role=align-popup]')[0]).toBeDefined();
  expect($('[role=align-popup]')[0].getAttribute('class')).toEqual(expect.stringContaining('ux-dropdown-placement-topLeft'));
  // await waitTime(200);
  removePopup();
  wrapper.destroy();
});

it('render dropdown disable correctly', async () => {
  const wrapper = mount(UxDropdown, {
    slots: {
      trigger: '<button>testButton</button>',
      overlay: 'popup content',
    },
    propsData: {
      disabled: true,
      trigger: 'click'
    },
    attachToDocument: true,
    sync: false,
  });
  await waitTime(20);
  wrapper.trigger('click');
  await waitTime(200);
  // console.log(wrapper.html());
  expect($('[role=align-popup]')[0]).not.toBeDefined();
  wrapper.destroy();
});

it('render visible change correctly', async () => {
  const wrapper = mount({
    template: `
    <div ref="containerRef" >
      <ux-dropdown-button v-model="visible"
                          :get-popup-container="getContainer"
                          :trigger="trigger">
        dropdown button
        <ux-menu slot="overlay" class="overlay"
                 multiple>
          <ux-menu-item name="sub-menu-item-3-1">sub-menu-item-1</ux-menu-item>
          <ux-menu-item name="sub-menu-item-3-2">sub-menu-item-2</ux-menu-item>
        </ux-menu>
      </ux-dropdown-button>
    </div>
    `,
    data() {
      return {
        visible: false,
        trigger: ['none', 'click']
      };
    },
    components: {
      UxDropdown,
      UxDropdownButton,
      UxMenuItem: Menu.MenuItem,
      UxMenu: Menu,
    },
    methods: {
      getContainer() {
        return this.$refs.containerRef;
      },
    },
  }, {
    attachToDocument: true,
    sync: false,
  });
  await waitTime(20);
  wrapper.setData({ visible: true });
  await waitTime(20);
  expect(wrapper.find('.ux-dropdown').isVisible()).toBe(true);
  wrapper.find('.ux-dropdown-menu-item').trigger('click');
  await waitTime(200);
  expect(wrapper.find('.ux-dropdown').isVisible()).toBe(false);
  wrapper.destroy();
});
