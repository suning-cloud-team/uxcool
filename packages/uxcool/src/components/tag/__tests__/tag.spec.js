import { mount, triggerEvent, waitTime } from '@cloud-sn/v-test-utils';
import { UxTag } from '..';

describe.skip('UxTag', () => {
  // TODO: 需重写, hw 2020-01-09
  const propsData = {
    color: 'rgb(255, 0, 0)',
  };
  const vmWrapper = mount(UxTag, {
    propsData,
  });

  beforeAll(vmWrapper.vm.$nextTick);

  it('color', () => {
    expect(vmWrapper.vm.$el.style.backgroundColor).toBe(propsData.color);
  });

  it('close', async () => {
    vmWrapper.setProps({
      closable: true,
    });
    const closeHandle = vmWrapper.find('i.fu-close');
    closeHandle.trigger('click');

    await vmWrapper.vm.$nextTick();

    expect(vmWrapper.vm.$el.nodeName).toBe('#comment');
    expect(vmWrapper.emitted().close.length).toBe(1);
    await waitTime(600);
    // expect(vmWrapper.emitted()['after-close'].length).toBe(1);
  });
});

describe('tag', () => {
  it('render tag correctly', async () => {
    const wrapper = mount(UxTag);
    expect(wrapper.classes()).toContain('ux-tag-light');
    wrapper.setProps({ color: 'red', closable: true });
    await waitTime();
    expect(wrapper.classes()).toContain('ux-tag-red');
    expect(wrapper.find('.fu-close').exists()).toBeTruthy();
  });

  it('close event correctly', async () => {
    const onBeforeCloseFn = jest.fn(() => true);
    const closeFn = jest.fn();
    const wrapper = mount(UxTag, {
      propsData: {
        closable: true,
        onBeforeClose: onBeforeCloseFn
      },
      listeners: {
        close: closeFn
      }
    });
    await triggerEvent(wrapper.find('.fu-close'), 'click');
    expect(onBeforeCloseFn).toHaveBeenCalled();
    expect(closeFn).toHaveBeenCalled();
    expect(wrapper.isEmpty()).toBe(true);
  });

  it('render checkable tag correctly', async () => {
    const wrapper = mount({
      template: `
        <div>
          <checkable-tag v-for="(tag,i) in tags"
                   :key="i"
                   :theme="'dark'"
                   :checked="isChecked(tag)"
                   @change="onChange($event,tag)">
            {{ tag }}
          </checkable-tag>        
        </div>
      `,
      components: {
        CheckableTag: UxTag.CheckableTag,
      },
      data() {
        return {
          tags: ['Movies', 'Books', 'Music', 'Sports'],
          checkedTags: ['Books'],
        };
      },
      methods: {
        isChecked(tag) {
          return this.checkedTags.indexOf(tag) > -1;
        },
        onChange(checked, tag) {
          const { checkedTags } = this;
          this.checkedTags = checked ? [...checkedTags, tag] : checkedTags.filter((v) => v !== tag);
        },
      },
    });
    await waitTime();
    expect(wrapper.find('.ux-tag-checkable-checked').text()).toBe('Books');
    await triggerEvent(wrapper.find('.ux-tag-checkable-checked'), 'click');
    expect(wrapper.find('.ux-tag-checkable-checked').exists()).toBe(false);
  });
});
