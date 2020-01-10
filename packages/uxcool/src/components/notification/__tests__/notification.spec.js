import { waitTime, $, getVueCreateElement } from '@suning/v-test-utils';
import UxNotification from '..';
import { UxButton } from '../../button';

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
});
