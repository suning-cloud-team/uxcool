import { mount } from '@suning/v-test-utils';
import UxSpin from '..';

describe.skip('UxSpin', () => {
  // TODO: 用户需重写, hw 2019-01-09
  const loadingHint = 'empty tip $';
  const vmWrapper = mount({
    data() {
      return { isLoading: false, tip: loadingHint };
    },
    render() {
      return (
        <UxSpin spinning={this.isLoading} tip={this.tip}>
          <div style="width:120px;height:120px" />
        </UxSpin>
      );
    },
  });

  beforeEach(vmWrapper.vm.$nextTick);

  it('props', async () => {
    expect(vmWrapper.find('.ux-spin-spinning').exists()).toBe(false);
    vmWrapper.setData({
      isLoading: true,
    });

    expect(vmWrapper.find('.ux-spin-spinning').exists()).toBe(true);
    expect(vmWrapper.find('.ux-spin-text').element.innerHTML.trim()).toBe(loadingHint);
  });
});
