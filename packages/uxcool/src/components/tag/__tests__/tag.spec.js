import { mount, waitTime } from '@suning/v-test-utils';
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
