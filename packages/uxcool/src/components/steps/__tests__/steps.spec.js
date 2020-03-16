import { mount, waitTime } from '@suning/v-test-utils';
import { UxSteps, UxStep } from '..';

describe('UxSteps', () => {
  it('render correctly', async () => {
      const wrapper = mount({
        template: `
          <ux-steps ref="uxsteps"
                     :current="current"
                    :theme="theme">
            <ux-step v-for="(step,i) in steps"
                     :key="i"
                     :title="step.title"
                     :desc="description">
            </ux-step>
          </ux-steps>
        `,
        components: {
          UxSteps,
          UxStep,
        },
        data() {
          return {
            current: 1,
            steps: [],
            theme: 'light',
            description: '这是描述',
          };
        },
        created() {
          this.steps = Array(4)
            .fill(0)
            .map((v, i) => ({ title: `步骤${i + 1}` }));
        },

      });
      await waitTime();
      const steps = wrapper.findAll('.ux-steps-item');
      expect(steps.length).toBe(4);
      expect(steps.at(0).classes('ux-steps-item-finish')).toBeTruthy();
      expect(steps.at(1).classes('ux-steps-item-process')).toBeTruthy();
      expect(steps.at(2).classes('ux-steps-item-wait')).toBeTruthy();
      expect(steps.at(3).classes('ux-steps-item-wait')).toBeTruthy();
      expect(steps.at(0).find('.ux-steps-item-title').text()).toBe('步骤1');
      expect(steps.at(0).find('.ux-steps-item-description').text()).toBe('这是描述');
  });

});
