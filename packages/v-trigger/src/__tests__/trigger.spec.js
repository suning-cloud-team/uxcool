import {
  waitTime, mount, shallowMount, $
} from '@cloud-sn/v-test-utils';
import Trigger from '../index';

const TestNestTrigger = {
  name: 'TestNestTrigger',
  data() {
    return {
      outerProps: {
        prefixCls: 'a-b',
        actions: ['click'],
        popupAlign: { points: ['tl', 'bl'] },
        mouseEnterDelay: 0,
        mouseLeaveDelay: 0,
        focusDelay: 0,
        blurDelay: 0,
      },
      innerProps: {
        prefixCls: 'inner-a-b',
        actions: ['hover'],
        popupAlign: { points: ['tl', 'bl'] },
        mouseEnterDelay: 0,
        mouseLeaveDelay: 0,
        focusDelay: 0,
        blurDelay: 0,
      },
      outerRef: null,
      innerRef: null,
    };
  },
  mounted() {
    const {
      $refs: { outerPopupRef, innerPopupRef },
    } = this;
    this.outerRef = outerPopupRef;
    this.innerRef = innerPopupRef;
  },
  render() {
    const { outerProps, innerProps } = this;
    return (
      <Trigger {...{ props: outerProps, ref: 'outerPopupRef' }}>
        <Trigger {...{ props: innerProps, ref: 'innerPopupRef', slot: 'trigger' }}>
          <span slot="trigger">trigger </span>
          <strong slot="popup">inner trigger</strong>
        </Trigger>
        <strong slot="popup">outer trigger</strong>
      </Trigger>
    );
  },
};

// @component vue
const SlotTrigger = {
  data() {
    return {
      changeTrigger: false,
    };
  },
  methods: {
    onChangeTrigger() {
      this.changeTrigger = !this.changeTrigger;
    },
    onClick() {
      throw new Error('Please use mock');
    },
  },
  render() {
    const { changeTrigger, onChangeTrigger, onClick } = this;
    return (
      <div>
        <button on-click={onChangeTrigger}>changeTrigger</button>
        <Trigger actions={['click']} popup-align={{ points: ['tl', 'bl'] }} on-click={onClick}>
          {!changeTrigger ? (
            <span class="trigger first" slot="trigger">
              first trigger
            </span>
          ) : (
            <div class="trigger second" slot="trigger">
              second trigger
            </div>
          )}
        </Trigger>
      </div>
    );
  },
};
function createWrapper(Cmp, opts) {
  return (options) => mount(Cmp, { ...opts, ...options });
}

const createTriggerWrapper = createWrapper(Trigger, { sync: false });

describe('Trigger Render', () => {
  describe('Actions', () => {
    describe.each([
      ['click', 'click', 'click'],
      ['hover', 'mouseenter', 'mouseleave'],
      ['focus', 'focusin', 'focusout'],
    ])('%s action', (action, enter, leave) => {
      it(action, async () => {
        const wrapper = createTriggerWrapper({
          propsData: {
            prefixCls: 'a-b',
            actions: [action],
            popupAlign: { points: ['tl', 'bl'] },
            mouseEnterDelay: 0,
            mouseLeaveDelay: 0,
            focusDelay: 0,
            blurDelay: 0,
          },
          slots: {
            trigger: 'trigger',
            popup: 'I`m a popup',
          },
        });
        await waitTime(20);

        wrapper.trigger(enter || action);
        await waitTime(20);
        expect(
          $(wrapper.vm.portal.$el)
            .find('.a-b')
            .css('display')
        ).not.toBe('none');

        wrapper.trigger(leave || action);
        await waitTime(20);
        expect(
          $(wrapper.vm.portal.$el)
            .find('.a-b')
            .css('display')
        ).toBe('none');
      });

      it(`destroyPopupOnHide and ${action}`, async () => {
        const wrapper = createTriggerWrapper({
          propsData: {
            prefixCls: 'a-b',
            actions: [action],
            popupAlign: { points: ['tl', 'bl'] },
            mouseEnterDelay: 0,
            mouseLeaveDelay: 0,
            focusDelay: 0,
            blurDelay: 0,
            destroyPopupOnHide: true,
          },
          slots: {
            trigger: 'trigger',
            popup: 'I`m a popup',
          },
        });

        await waitTime(20);
        expect(
          $(wrapper.vm.portal.$el)
            .find('.a-b')
            .get(0)
        ).toBeUndefined();

        wrapper.trigger(enter || action);
        await waitTime(20);
        expect(
          $(wrapper.vm.portal.$el)
            .find('.a-b')
            .get(0)
        ).not.toBeUndefined();

        wrapper.trigger(leave || action);
        await waitTime(20);
        expect(
          $(wrapper.vm.portal.$el)
            .find('.a-b')
            .get(0)
        ).toBeUndefined();
      });

      it(`default visible = true and ${action}`, async () => {
        const wrapper = createTriggerWrapper({
          propsData: {
            prefixCls: 'a-b',
            actions: [action],
            popupAlign: { points: ['tl', 'bl'] },
            visible: true,
            mouseEnterDelay: 0,
            mouseLeaveDelay: 0,
            focusDelay: 0,
            blurDelay: 0,
          },
          slots: {
            trigger: 'trigger',
            popup: 'I`m a popup',
          },
        });
        await waitTime(100);
        expect(
          $(wrapper.vm.portal.$el)
            .find('.a-b')
            .css('display')
        ).not.toBe('none');
        wrapper.trigger(leave || action);
        return wrapper.vm.$nextTick().then(() => {
          expect(
            $(wrapper.vm.portal.$el)
              .find('.a-b')
              .css('display')
          ).toBe('none');
        });
      });
    });

    it('Nest Actions', async () => {
      const wrapper = mount(TestNestTrigger, {
        sync: false,
      });
      const { innerRef, outerRef } = wrapper.vm;
      expect(innerRef).not.toBeNull();
      expect(outerRef).not.toBeNull();
      // 等待 内部事件绑定
      await waitTime(20);

      wrapper.trigger('click');
      wrapper.trigger('mouseenter');
      // 异步渲染
      await waitTime(20);
      expect(
        $(outerRef.portal.$el)
          .find('.a-b')
          .css('display')
      ).not.toBe('none');
      expect(
        $(innerRef.portal.$el)
          .find('.inner-a-b')
          .css('display')
      ).not.toBe('none');

      wrapper.trigger('mouseleave');
      await waitTime(20);
      expect(
        $(outerRef.portal.$el)
          .find('.a-b')
          .css('display')
      ).not.toBe('none');
      expect(
        $(innerRef.portal.$el)
          .find('.inner-a-b')
          .css('display')
      ).toBe('none');

      wrapper.trigger('click');
      await waitTime(20);
      expect(
        $(outerRef.portal.$el)
          .find('.a-b')
          .css('display')
      ).toBe('none');
      expect(
        $(innerRef.portal.$el)
          .find('.inner-a-b')
          .css('display')
      ).toBe('none');
    });

    it('dynamic Actions', async () => {
      const mockClick = jest.fn();
      const mockMouseEnter = jest.fn();
      const mockFocus = jest.fn();
      const wrapper = shallowMount(Trigger, {
        propsData: {
          prefixCls: 'a-b',
          actions: ['click'],
          popupAlign: { points: ['tl', 'bl'] },
          mouseEnterDelay: 0,
          mouseLeaveDelay: 0,
          focusDelay: 0,
          blurDelay: 0,
        },
        slots: {
          trigger: 'trigger',
          popup: 'I`m a popup',
        },
        methods: {
          onClick: mockClick,
          onMouseEnter: mockMouseEnter,
          onFocus: mockFocus,
        },
      });
      function triggerEvents(events) {
        events.forEach((event) => wrapper.trigger(event));
      }
      function mockFnReset() {
        mockClick.mockReset();
        mockMouseEnter.mockReset();
        mockFocus.mockReset();
      }
      await waitTime(20);

      triggerEvents(['click', 'mouseenter', 'focusin']);
      expect(mockClick).toHaveBeenCalled();
      expect(mockMouseEnter).not.toHaveBeenCalled();
      expect(mockFocus).not.toHaveBeenCalled();

      mockFnReset();

      wrapper.setProps({ actions: ['hover'] });
      await waitTime(20);

      triggerEvents(['click', 'mouseenter', 'focusin']);
      expect(mockClick).not.toHaveBeenCalled();
      expect(mockMouseEnter).toHaveBeenCalled();
      expect(mockFocus).not.toHaveBeenCalled();

      mockFnReset();

      wrapper.setProps({ actions: ['focus'] });
      await waitTime(20);
      triggerEvents(['click', 'mouseenter', 'focusin']);
      expect(mockClick).not.toHaveBeenCalled();
      expect(mockMouseEnter).not.toHaveBeenCalled();
      expect(mockFocus).toHaveBeenCalled();
    });

    it('change trigger slot', async () => {
      const mockClick = jest.fn();
      const wrapper = mount(SlotTrigger, {
        sync: false,
        methods: {
          onClick: mockClick,
        },
      });
      await waitTime(20);
      const firstTrigger = wrapper.find('.trigger');
      expect(firstTrigger.text()).toBe('first trigger');
      firstTrigger.trigger('click');
      await waitTime(20);
      expect(mockClick).toHaveBeenCalled();

      mockClick.mockReset();
      const changeBtn = wrapper.find('button');
      changeBtn.trigger('click');
      await waitTime(20);
      const secondTrigger = wrapper.find('.trigger');
      expect(secondTrigger.text()).toBe('second trigger');
      secondTrigger.trigger('click');
      expect(mockClick).toHaveBeenCalled();
    });
  });

  describe('getPopupContainer', () => {
    it('default to document.body', () => {
      const wrapper = createTriggerWrapper({
        propsData: {
          actions: ['click'],
          popupAlign: { points: ['tl', 'bl'] },
        },
        slots: {
          trigger: 'trigger',
          popup: 'I`m a popup',
        },
      });

      wrapper.trigger('click');
      expect(wrapper.vm.portal.$el.parentNode).toBe(document.body);
    });

    it('change container', () => {
      const element = document.createElement('div');
      element.setAttribute('id', 'parent');
      const wrapper = createTriggerWrapper({
        propsData: {
          actions: ['click'],
          popupAlign: { points: ['tl', 'bl'] },
          getPopupContainer: () => element,
        },
        slots: {
          trigger: 'trigger',
          popup: 'I`m a popup',
        },
      });

      wrapper.trigger('click');
      expect(wrapper.vm.portal.$el.parentNode).toBe(element);
    });
  });

  describe('', () => {});
});
