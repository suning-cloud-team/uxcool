import { mount, waitTime } from '@cloud-sn/v-test-utils';
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
  affixWrapper.destroy();
});

it('offset bottom render correctly', async () => {
  Element.prototype.getBoundingClientRect = jest.fn(() => ({
    top: 203,
    left: 240,
    bottom: 353,
    right: 1309,
    width: 1069,
    height: 150,
    cw: 1050,
    ch: 148,
  }))
    .mockImplementationOnce(() => ({
      top: 203,
      left: 240,
      bottom: 353,
      right: 1309,
      width: 1069,
      height: 150,
      cw: 1050,
      ch: 148,
    }))
    .mockImplementationOnce(() => ({
      x: 241,
      y: 404,
      width: 1050,
      height: 32,
      top: 404,
      right: 1291,
      bottom: 436,
      left: 241
    }));
  Object.defineProperty(HTMLDivElement.prototype, 'offsetHeight', {
    get: () => 32
  });
  const wrapper = mount({
    template: `
    <div ref="containerRef"
         style="height: 150px; border:1px solid #ccc; overflow:auto">
      <div style="height:500px">
        <div style="padding-top:200px">
          <ux-affix :get-target="getTarget"
                    :offset-bottom="10">
            <button>container</button>
          </ux-affix>
        </div>
      </div>
    </div>    
    `,
    components: {
      UxAffix,
    },
    methods: {
      getTarget() {
        const { $refs: { containerRef } } = this;
        return containerRef;
      },
    },
  });
  await waitTime();
  expect(wrapper.find('.ux-affix').element.style.bottom).toBe('425px');
});
