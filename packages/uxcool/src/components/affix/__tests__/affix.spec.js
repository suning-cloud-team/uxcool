import { mount, triggerEvent, createWrapper } from '@cloud-sn/v-test-utils';
import UxAffix from '..';

describe('Affix', () => {
  Object.defineProperties(HTMLElement.prototype, {
    clientWidth: {
      get() {
        return 1000;
      },
    },
    clientHeight: {
      get() {
        return 400;
      },
    },
    clientTop: {
      get() {
        return 0;
      },
    },
    offsetHeight: {
      get() {
        return 30;
      },
    },
  });

  it('offsetTop is set', async () => {
    HTMLElement.prototype.getBoundingClientRect = jest
      .fn(() => ({
        top: 50,
        right: 1000,
        bottom: 80,
        left: 0,
        width: 1000,
        height: 30,
      }))
      .mockImplementationOnce(() => ({
        top: 0,
        right: 1000,
        bottom: 400,
        left: 0,
        width: 1000,
        height: 400,
      }))
      .mockImplementationOnce(() => ({
        top: 100,
        right: 1000,
        bottom: 130,
        left: 0,
        width: 1000,
        height: 30,
      }))
      .mockImplementationOnce(() => ({
        top: 0,
        right: 1000,
        bottom: 400,
        left: 0,
        width: 1000,
        height: 400,
      }));

    const wrapper = mount(
      {
        render() {
          return (
            <div ref="container" style="height: 400px">
              <div style="height: 1000px;padding: 300px 0;">
                <UxAffix ref="affix" offset-top={60} get-target={() => this.$refs.container}>
                  <button>test</button>
                </UxAffix>
              </div>
            </div>
          );
        },
      },
      {
        attachToDocument: true,
      }
    );

    const container = wrapper.find({ ref: 'container' });
    const affix = wrapper.find({ ref: 'affix' });
    const affixNode = createWrapper(affix.vm.$refs.affixRef);

    expect(affixNode.element.style.position).toBe('');

    container.element.scrollTop = 50;
    await triggerEvent(container, 'scroll');
    expect(affixNode.element.style.position).toBe('fixed');
    expect(affix.emitted().change).toBeTruthy();
    wrapper.destroy();
  });

  it('offsetBottom is set', async () => {
    HTMLElement.prototype.getBoundingClientRect = jest
      .fn(() => ({
        top: 500,
        right: 1000,
        bottom: 530,
        left: 0,
        width: 1000,
        height: 30,
      }))
      .mockImplementationOnce(() => ({
        top: 0,
        right: 1000,
        bottom: 400,
        left: 0,
        width: 1000,
        height: 400,
      }));

    const wrapper = mount(
      {
        render() {
          return (
            <div ref="container" style="height: 400px">
              <div style="height: 1000px;padding: 500px 0;">
                <UxAffix ref="affix" offset-bottom={60} get-target={() => this.$refs.container}>
                  <button>test</button>
                </UxAffix>
              </div>
            </div>
          );
        },
      },
      {
        attachToDocument: true,
      }
    );

    await wrapper.vm.$nextTick();
    expect(
      createWrapper(wrapper.find({ ref: 'affix' }).vm.$refs.affixRef).element.style.position
    ).toBe('fixed');
    wrapper.destroy();
  });

  it('default target', async () => {
    const wrapper = mount(UxAffix, {
      attachToDocument: true,
      propsData: {
        offsetTop: 60,
      },
    });

    expect(wrapper.emitted().change).toBeFalsy();
    wrapper.destroy();
  });
});
