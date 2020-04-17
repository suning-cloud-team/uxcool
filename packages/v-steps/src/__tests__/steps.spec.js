import { mount, waitTime, destroyWrapper } from '@suning/v-test-utils';
import { VSteps, VStep } from '../index';

const stepsWrapper = {
  props: {
    current: {
      type: [Number, String],
      default: 1
    },
    direction: {
      type: String,
      default: 'horizontal'
    },
    status: {
      type: String,
      default: 'process'
    },
  },
  render() {
    const { current, direction, status } = this;
    return (
      <VSteps current={current} direction={direction} status={status}>
        <VStep title="已完成" desc="这是描述1"></VStep>
        <VStep title="进行中" desc="这是描述2"></VStep>
        <VStep title="待运行" desc="这是描述3"></VStep>
        <VStep title="待运行" desc="这是描述4"></VStep>
      </VSteps>
    );
  }
};

describe('steps', () => {
  it('render VSteps correctly', async () => {
    Object.defineProperty(HTMLDivElement.prototype, 'offsetWidth', {
      set: () => 400
    });
    Object.defineProperty(window.document, 'documentElement', {
      set: () => {}
    });
    const wrapper = mount(stepsWrapper);
    const steps = wrapper.findAll(VStep);

    await waitTime();
    expect(wrapper.is('.v-steps')).toBe(true);
    expect(steps.length).toBe(4);
    expect(steps.at(0).is('.v-steps-item-finish')).toBe(true);
    expect(steps.at(0).find('.v-steps-item-title').text()).toBe('已完成');
    expect(steps.at(0).find('.v-steps-item-description').text()).toBe('这是描述1');

    wrapper.setProps({
      current: 2,
      status: 'error'
    });
    await waitTime();
    expect(wrapper.html()).toMatchSnapshot();
    expect(steps.at(1).is('.v-steps-item-finish')).toBe(true);
    destroyWrapper(wrapper);
  });
});
