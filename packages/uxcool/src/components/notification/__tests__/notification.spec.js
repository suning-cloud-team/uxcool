import { waitTime, $, getVueCreateElement } from '@cloud-sn/v-test-utils';
import UxNotification from '..';
import { UxButton } from '../../button';
import Icon from '../../icon';

describe('notifycation', () => {
  // eslint-disable-next-line
  const h = getVueCreateElement();
  describe.each(['open', 'success', 'error', 'info', 'warn', 'warning'])(
    'render correctly',
    (notice) => {
      it(`render ${notice} correctly`, async () => {
        UxNotification[notice]({
          title: 'this is title',
          description: '<p>desc</p>',
          dangerouslySetInnerHTML: true,
          duration: 0,
          btn: <UxButton>confirm</UxButton>,
          closable: false,
        });
        await waitTime(50);
        expect($('.ux-notification-notice-message')[0].innerHTML).toBe('this is title');
        expect($('.ux-notification-notice-description')[0].children[0].outerHTML).toBe(
          '<p>desc</p>'
        );
        expect($('.ux-notification-notice-btn')[0].children[0].className).toBe('ux-btn');
        expect($('.ux-notification-notice-close').length).toBe(0);
        UxNotification.destroy();
      });
    }
  );

  describe.each(['topLeft', 'topRight', 'bottomLeft', 'bottomRight'])(
    'render placement correctly',
    (placement) => {
      it(`render ${placement} correctly`, async () => {
        UxNotification.info({
          title: 'this is title',
          description: 'desc',
          placement,
          duration: 0,
        });
        await waitTime(50);
        expect($(`.ux-notification-${placement}`).length).toBe(1);
        UxNotification.destroy();
      });
    }
  );

  it('duration correctly', async () => {
    UxNotification.info({
      title: 'this is title',
      description: 'desc',
      duration: 200,
    });
    await waitTime(50);
    expect($('.ux-notification-notice').length).toBe(1);
    await waitTime(300);
    expect($('.ux-notification-notice').length).toBe(0);
  });

  it('global config correctly', async () => {
    document.body.appendChild(document.createElement('section'));
    UxNotification.config({
      top: 300,
      bottom: 300,
      getContainer: () => $('section')[0],
    });
    UxNotification.info({
      title: 'this is title',
      description: 'desc',
      duration: 0,
      placement: 'topRight',
    });
    UxNotification.info({
      title: 'this is title',
      description: 'desc',
      duration: 0,
      placement: 'bottomRight',
    });
    await waitTime(50);
    expect($('.ux-notification-topRight').css('top')).toBe('300px');
    expect($('.ux-notification-bottomRight').css('bottom')).toBe('300px');
    expect($('.ux-notification-topRight')[0].parentElement.tagName).toBe('SECTION');
    expect($('.ux-notification-bottomRight')[0].parentElement.tagName).toBe('SECTION');
    UxNotification.destroy();
  });

  it('icon and theme correctly', async () => {
    UxNotification.open({
      title: 'notification',
      icon: {
        type: 'bells',
        style: {
          color: 'skyblue',
        },
      },
      duration: 0,
    });
    await waitTime(50);
    const node = $('.ux-notification-notice-with-icon .ux-notification-notice-icon-bells');
    expect(node.css('color')).toBe('skyblue');
    UxNotification.destroy();
  });

  it('icon vnode correctly', async () => {
    UxNotification.open({
      title: 'notificationification',
      icon: <Icon type="question_circle" style="color:red" />
    });
    await waitTime(50);
    const node = $('.ux-notification-notice-with-icon .fu-question_circle');
    expect(node.css('color')).toBe('red');
    UxNotification.destroy();
  });

  it('notice callback to destroy correctly', async () => {
    const hanlde = UxNotification.open({
      title: 'notification',
      icon: {
        type: 'bells',
        style: {
          color: 'skyblue',
        },
      },
      duration: 0,
    });
    hanlde();
    await waitTime(50);
    const node = $('.ux-notification-notice-with-icon  .ux-notification-notice-icon-bells');
    expect(node.html()).not.toBeDefined();
    UxNotification.destroy();
  });

  it('global config bottom correctly', async () => {
    document.body.appendChild(document.createElement('section'));
    UxNotification.config({
      bottom: 300,
      placement: 'bottomRight',
      getContainer: () => $('section')[0],
    });
    UxNotification.info({
      title: 'this is title',
      description: 'desc',
    });
    await waitTime(50);
    expect($('.ux-notification-bottomRight').css('bottom')).toBe('300px');
    UxNotification.destroy();
  });

  it('global config Container correctly', async () => {
    document.body.appendChild(document.createElement('section'));
    UxNotification.config({
      getContainer: () => $('section')[0],
    });
    UxNotification.info({
      title: 'this is info title',
      description: 'desc',
    });
    await waitTime(50);
    expect($('.ux-notification').html()).toEqual(expect.stringContaining('this is info title'));
    UxNotification.destroy();
  });
  it('global config theme correctly', async () => {
    UxNotification.config({
      theme: 'dark',
      duration: 150
    });
    UxNotification.open({
      title: 'this is theme',
      description: 'desc',
    });
    await waitTime(50);
    expect($('.ux-notification').html()).toEqual(expect.stringContaining('this is theme'));
    UxNotification.destroy();
  });
  it('global config prefixCls correctly', async () => {
    UxNotification.config({
      prefixCls: 'cx',
      duration: 150
    });
    UxNotification.open({
      title: 'this is custom prefixCls',
      description: 'desc',
    });
    await waitTime(50);
    expect($('.cx-notice').html()).toEqual(expect.stringContaining('this is custom prefixCls'));
    UxNotification.destroy();
  });
});
