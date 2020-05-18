import { mount, waitTime } from '@cloud-sn/v-test-utils';
import Align from '../index';

describe('Align', () => {
  const alignWrapperMounter = {
    props: {
      align: {
        type: Object,
        default: () => {},
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      monitorWinResize: {
        type: Boolean,
        default: false,
      },
      monitorBufferTime: {
        type: Number,
        default: 50,
      },
    },
    methods: {
      target() {
        return this.$refs.container;
      },
    },
    render() {
      const {
        align, disabled, monitorWinResize, target, monitorBufferTime
      } = this;
      return (
        <div ref="container" style="width: 300px; height: 300px;">
          <Align
            ref="alignWrapper"
            style="position:absolute; width: 60px; height: 60px;"
            target={target}
            align={align}
            disabled={disabled}
            monitorWinResize={monitorWinResize}
            monitorBufferTime={monitorBufferTime}
          >
            <span class="child">test align</span>
          </Align>
        </div>
      );
    },
  };

  it('render', async () => {
    const wrapper = await mount(alignWrapperMounter);
    const alignWrapper = wrapper.find({ ref: 'alignWrapper' });
    expect(wrapper.html()).toMatchSnapshot();

    wrapper.vm.$nextTick(async () => {
      wrapper.setProps({
        align: {
          useCssTransform: true,
          points: ['tl', 'tl'],
        },
        disabled: false,
        monitorWinResize: true,
        monitorBufferTime: 100,
      });
      await waitTime();
      expect(wrapper.html()).toMatchSnapshot();
      alignWrapper.destroy();
    });
  });

  it('disabled is false and monitorWinResize is true when mounted', async () => {
    const wrapper = await mount(alignWrapperMounter, {
      propsData: {
        disabled: false,
        monitorWinResize: true,
      },
    });
    const alignWrapper = wrapper.find({ ref: 'alignWrapper' });
    expect(wrapper.html()).toMatchSnapshot();

    wrapper.vm.$nextTick(async () => {
      wrapper.setProps({
        align: {
          useCssTransform: true,
          points: ['tl', 'tr'],
        },
        disabled: false,
        monitorWinResize: false,
      });
      await waitTime();
      expect(wrapper.html()).toMatchSnapshot();
      alignWrapper.destroy();
    });
  });

  it('disabled is true', async () => {
    const wrapper = await mount(alignWrapperMounter, {
      propsData: {
        disabled: false,
        monitorWinResize: true,
      },
    });
    const alignWrapper = wrapper.find({ ref: 'alignWrapper' });
    expect(wrapper.html()).toMatchSnapshot();

    wrapper.vm.$nextTick(async () => {
      wrapper.setProps({
        disabled: true,
      });
      await waitTime();
      expect(wrapper.html()).toMatchSnapshot();
    });
    alignWrapper.destroy();
  });

  it('render no child', async () => {
    const wrapper = await mount({
      render() {
        return (
          <div ref="container" style="width: 300px; height: 300px;">
            <Align ref="alignWrapper" style="position:absolute; width: 60px; height: 60px;"></Align>
          </div>
        );
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
