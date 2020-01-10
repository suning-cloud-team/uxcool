import { mount, waitTime } from '@suning/v-test-utils';
import UxAffix from '..';

const affixWrapperMounter = {
  render() {
    return (
      <div style="height: 400px" ref="container">
        <UxAffix offset-top={60} ref="affixWrapper" getTarget={() => this.$refs.container}>
          <button style="height: 30px">TEST AFFIX</button>
        </UxAffix>
        <div style="height: 1200px" />
      </div>
    );
  },
};

it('offset top render correctly', async () => {
  const wrapper = mount(affixWrapperMounter, { attachToDocument: true, sync: false });
  const container = wrapper.find({ ref: 'container' });
  const affixWrapper = wrapper.find({ ref: 'affixWrapper' });
  container.element.scrollTop = 61;
  affixWrapper.vm.updatePosition();
  await waitTime(200);
  expect(affixWrapper.element.style.height).toBe('0px');
});
