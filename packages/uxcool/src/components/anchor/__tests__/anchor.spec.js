import { mount, waitTime, triggerEvent } from '@cloud-sn/v-test-utils';
import { UxAnchor, UxAnchorLink } from '..';

describe('anchor', () => {
  it('render correctly with beforeHashChange', async () => {
    const wrapper = mount({
      template: `
          <div>
            <div id="basicDemo" style="height: 300px;">basicDemo</div>
            <div id="secondDemo"style="height: 300px;">second demo</div>
            <div id="t-d" style="height: 300px;">t-d</div>
            <div id="t-t-d" style="height: 300px;">t-t-d</div>
            <ux-anchor style="position: fixed; right: 0px; top: 50%;" :beforeHashChange="() => false">
              <ux-anchor-link href="#basicDemo" title="basic demo" />
              <ux-anchor-link href="#secondDemo" title="second demo" />
              <ux-anchor-link href="#ccc" title="ccc">
                <ux-anchor-link href="#t-d" title="t-d">
                  <ux-anchor-link href="#t-t-d" title="t-t-d" />
                </ux-anchor-link>
              </ux-anchor-link>
            </ux-anchor>
           </div>
        `,
      components: {
        UxAnchor,
        UxAnchorLink,
      },
    }, {
      attachToDocument: true
    });
    await triggerEvent(wrapper.find('[href="#secondDemo"]'), 'click');
    expect(wrapper.find('.ux-anchor-link-active').text()).toBe('second demo');
    expect(window.location.href.indexOf('#secondDemo')).toBe(-1);
    wrapper.destroy();
  });

  it('render correctly with container', async () => {
    const wrapper = mount({
      template: `
       <div id="containerAnchor" style="height:500px;overflow:auto">
        <div id="container-1"> container1
          <ux-anchor :get-container="getContainer" :offset-top="100" :beforeHashChange="() => false">
            <ux-anchor-link href="#container-1" title="basic demo" />
            <ux-anchor-link href="#container-2" title="second demo" />
          </ux-anchor>
        </div>
        <div id="container-2" style="margin:1400px 0">constiner 2</div>
       </div>
      `,
      components: {
        UxAnchor,
        UxAnchorLink,
      },
      data() {
        return {
          getContainer: () => { document.body; }
        };
      },
      created() {
        setTimeout(() => {
          this.getContainer = this.getContainerFn;
        }, 200);
      },
      methods: {
        getContainerFn() {
          return document.querySelector('#containerAnchor');
        },
      },
    }, {
      attachToDocument: true
    });
    await waitTime(500);
    await triggerEvent(wrapper.find('#containerAnchor'), 'scroll');
    expect(wrapper.find('.ux-anchor-link-title-active').text()).toBe('basic demo');
    await triggerEvent(wrapper.find('[href="#container-2"]'), 'click');
    expect(wrapper.find('.ux-anchor-link-title-active').text()).toBe('second demo');
    wrapper.destroy();
  });

  it('render correctly with hash', async () => {
    const wrapper = mount({
      template: `
          <div>
            <div id="basicDemo" style="height: 300px;">basicDemo</div>
            <div id="secondDemo"style="height: 300px;">second demo</div>
            <div id="t-d" style="height: 300px;">t-d</div>
            <div id="t-t-d" style="height: 300px;">t-t-d</div>
            <ux-anchor style="position: fixed; right: 0px; top: 50%;">
              <ux-anchor-link href="#basicDemo" title="basic demo" />
              <ux-anchor-link href="#secondDemo" title="second demo" />
              <ux-anchor-link href="#ccc" title="ccc">
                <ux-anchor-link href="#t-d" title="t-d">
                  <ux-anchor-link href="#t-t-d" title="t-t-d" />
                </ux-anchor-link>
              </ux-anchor-link>
            </ux-anchor>
           </div>
        `,
      components: {
        UxAnchor,
        UxAnchorLink,
      },
    }, {
      attachToDocument: true
    });
    await triggerEvent(wrapper.find('[href="#secondDemo"]'), 'click');
    const herf = `${window.location.href}`;
    expect(herf.indexOf('#secondDemo') > -1).toBeTruthy();
    wrapper.destroy();
  });
});
