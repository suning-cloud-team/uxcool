import { mount } from '@suning/v-test-utils';
import Vue from 'vue';
import UxTooltip from '..';

describe.skip('UxTooltip', () => {
  // TODO: 需重写, hw 2020-01-09
  const vmWrapper = mount(
    Vue.extend({
      components: { UxTooltip },
      template: `
      <ux-tooltip ref="tooltip" content="测试">
        ux-tooltip will show when mouse enter.
      </ux-tooltip>
    `,
    })
  );

  beforeAll(vmWrapper.vm.$nextTick);

  it('trigger', () => {
    vmWrapper.trigger('mouseenter');
    vmWrapper.trigger('mouseover');
    const tooltipCompo = vmWrapper.vm.$refs.tooltip;
    expect(tooltipCompo.$refs.tooltipRef.$data.open).toBe(true);
  });
});
