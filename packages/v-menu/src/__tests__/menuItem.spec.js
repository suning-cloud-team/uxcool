import { mount, waitTime } from '@suning/v-test-utils';
import { VMenu, VMenuItem } from '../index';

describe('menuItem', () => {
  it('mouseenter and mouseleave Actions', async () => {
    const wrapper = mount({
      render() {
        return (
          <VMenu >
            <VMenuItem name="item-1" class="item-1"
             >
              item-1
            </VMenuItem>
          </VMenu>
        );
      },
    });
    await waitTime(20);
    wrapper.find('.item-1').trigger('mouseenter');
    await waitTime();
    expect(wrapper.find('.item-1').classes('v-menu-item-active')).toBeTruthy();
    wrapper.find('.item-1').trigger('mouseleave');
    await waitTime();
    expect(wrapper.find('.item-1').classes('v-menu-item-active')).toBeFalsy();
  });
});
