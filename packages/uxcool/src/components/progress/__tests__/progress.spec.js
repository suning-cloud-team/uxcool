import { mountPickerFactory, waitTime, getVueCreateElement } from '@suning/v-test-utils';
import Progress from '..';

const mountProgress = mountPickerFactory(Progress);
describe('progress', () => {
  it('render default progress correctly', async () => {
    const wrapper = await mountProgress();
    expect(wrapper.html()).toMatchSnapshot();

    wrapper.setProps({
      percentage: 40,
      strokeWidth: 10,
      strokeLinecap: 'square',
      strokeColor: 'skyblue',
    });
    await waitTime();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('render custom progress correctly', async () => {
    // eslint-disable-next-line
    const h = getVueCreateElement();
    const wrapper = await mountProgress({
      propsData: {
        percentage: 40,
      },
    });
    expect(wrapper.find('.ux-progress-text').text()).toBe('40%');
    expect(wrapper.contains('.ux-progress-text')).toBeTruthy();

    wrapper.setProps({ format: (percentage) => <span>{`${percentage}项`}</span> });
    await waitTime();
    expect(wrapper.html()).toMatchSnapshot();

    wrapper.setProps({ hideInfo: true });
    await waitTime();
    expect(wrapper.contains('.ux-progress-text')).not.toBeTruthy();
  });

  it('render three status progress correctly', async () => {
    const wrapper = await mountProgress();
    expect(wrapper.contains('.ux-progress-status-success')).not.toBeTruthy();

    wrapper.setProps({ status: 'success' });
    await waitTime();
    expect(wrapper.contains('.ux-progress-status-success')).toBeTruthy();
    expect(wrapper.contains('.ux-progress-status-exception')).not.toBeTruthy();

    wrapper.setProps({ status: 'error' });
    await waitTime();
    expect(wrapper.contains('.ux-progress-status-exception')).toBeTruthy();
    expect(wrapper.contains('.ux-progress-status-active')).not.toBeTruthy();

    wrapper.setProps({ status: 'active' });
    await waitTime();
    expect(wrapper.contains('.ux-progress-status-active')).toBeTruthy();
  });

  it('render circle progress correctly', async () => {
    const wrapper = await mountProgress({
      propsData: {
        type: 'circle',
        percentage: 30,
      },
    });
    expect(wrapper.find('.ux-progress-inner').element.style.width).toBe('120px');

    wrapper.setProps({ width: 80 });
    await waitTime();
    expect(wrapper.find('.ux-progress-inner').element.style.width).toBe('80px');

    wrapper.setProps({ gapDegree: 60, gapPosition: 'bottom' });
    await waitTime();
    // inner element is svg, may use snapshot to test
    expect(wrapper.element).toMatchSnapshot();
  });

  it('render dashboard progress correctly', async () => {
    const wrapper = await mountProgress({
      propsData: {
        type: 'dashboard',
        percentage: 30,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it.each(['left', 'right', 'bottom'])('render circle on differe pos', async (pos) => {
    const wrapper = await mountProgress({
      propsData: {
        type: 'circle',
        percentage: 30,
        gapPosition: pos,
        status: 'active'
      },
    });
    expect(wrapper.find('.ux-progress-inner').element.style.width).toBe('120px');
  });

  it.each([-10, 110])('render circle with  abnormal percentage', async (percentage) => {
    const wrapper = await mountProgress({
      propsData: {
        type: 'circle',
        percentage,
        status: 'default'
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
