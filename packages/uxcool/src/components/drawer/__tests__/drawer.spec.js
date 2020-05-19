import {
  mount, $, waitTime, removePopup
} from '@cloud-sn/v-test-utils';
import UxDrawer from '..';

const outerContainerDrawerMount = {
  render() {
    return (
      <div>
        <div ref="outerContainer" class="outerContainer" />
        <UxDrawer getContainer={() => this.$refs.outerContainer} visible />
      </div>
    );
  },
};

describe('render conatiner correctly', () => {
  it('use body as container', async () => {
    const wrapper = mount(UxDrawer, {
      propsData: {
        visible: true,
      },
      attachToDocument: true,
      sync: false,
    });
    await waitTime(200);
    expect($('.ux-drawer')[0].parentElement.parentElement.tagName).toBe('BODY');
    wrapper.destroy();
    removePopup();
  });
  it('use other element as container', async () => {
    const wrapper = mount(outerContainerDrawerMount, { attachToDocument: true, sync: false });
    await waitTime(200);
    expect($('.ux-drawer')[0].parentElement.parentElement.className).toBe('outerContainer');
    wrapper.destroy();
    removePopup();
  });

  it('render show mask correctly', async () => {
    const wrapper = mount(UxDrawer, {
      propsData: {
        visible: true,
        showMask: false,
      },
      attachToDocument: true,
      sync: false,
    });
    await waitTime(200);
    expect($('.ux-drawer-mask')[0]).toBeUndefined();
    wrapper.destroy();
    removePopup();
  });

  it('render mask closable correctly', async () => {
    const wrapper = mount(UxDrawer, {
      propsData: {
        visible: true,
        maskClosable: false,
      },
      attachToDocument: true,
      sync: false,
    });
    await waitTime(200);
    $('.ux-drawer-mask').click();
    await waitTime(200);
    expect($('.ux-drawer')[0].className.indexOf('ux-drawer-open')).not.toBe(-1);
    wrapper.destroy();
    removePopup();
  });

  it('event works correctly', async () => {
    const closeFn = jest.fn();
    const wrapper = mount(UxDrawer, {
      propsData: {
        closable: true,
      },
      listeners: {
        close: closeFn,
      },
      sync: false,
    });
    await waitTime(20);
    wrapper.setProps({ visible: true });
    await waitTime(50);
    $('button').click();
    await waitTime(50);
    expect(closeFn).toHaveBeenCalledTimes(1);
    removePopup();
  });

  it('inner drawer correctly', async () => {
    const wrapper = mount({
      render() {
        return (
            <div>
            <UxDrawer ref='outDrawer' placement="left">
              <div>outer content</div>
                <UxDrawer ref="innerDrawer" {...{ props: { visible: true, destroyOnClose: true } }}>
                  inner content
                </UxDrawer>
            </UxDrawer>
          </div>
        );
      }
    });
    const outDrawerRef = wrapper.find({ ref: 'outDrawer' });
    outDrawerRef.setProps({ visible: true });
    await waitTime(20);
    expect($('.ux-drawer')[0].style.transform).toBe('translateX(-180px)');
    outDrawerRef.setProps({ placement: 'top' });
    await waitTime(20);
    expect($('.ux-drawer')[0].style.transform).toBe('translateY(180px)');
    outDrawerRef.setProps({ placement: undefined });
    await waitTime(20);
    expect($('.ux-drawer')[0].style.transform).toBe('translateX(-180px)');
    outDrawerRef.setProps({ placement: 'bottom' });
    await waitTime(20);
    expect($('.ux-drawer')[0].style.transform).toBe('translateY(-180px)');
    $('.ux-drawer-mask')[1].click();
    $('.ux-drawer-mask')[0].click();
    await waitTime(20);
    expect($('.ux-drawer-open').length).toBe(0);
    wrapper.destroy();
    removePopup();
  });
});
