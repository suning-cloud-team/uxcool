import {
  mount,
  waitTime,
  getVueCreateElement,
  triggerEvent,
  getPortal,
} from '@suning/v-test-utils';
import UxPagination from '../index';
import Select from '../../select';

it('render simple correctly', () => {
  const wrapper = mount(UxPagination, {
    propsData: {
      simple: true,
      total: 100,
      pageSize: 10,
    },
  });
  expect(wrapper.findAll('button').length).toBe(0);
});

it('button works correctly', async () => {
  const wrapper = mount(UxPagination, {
    propsData: {
      total: 100,
      pageSize: 10,
      showQuickJumper: true,
      showQuickJumperConfirmBtn: true,
    },
  });
  await waitTime();
  expect(wrapper.find('.ux-pagination-item-1').classes('ux-pagination-item-active')).toBeTruthy();
  await triggerEvent(wrapper.find('.ux-pagination-item-2'), 'click');
  expect(wrapper.find('.ux-pagination-item-2').classes('ux-pagination-item-active')).toBeTruthy();
  await triggerEvent(wrapper.find('.ux-pagination-next'), 'click');
  expect(wrapper.find('.ux-pagination-item-3').classes('ux-pagination-item-active')).toBeTruthy();
  await triggerEvent(wrapper.find('.ux-pagination-prev'), 'click');
  expect(wrapper.find('.ux-pagination-item-2').classes('ux-pagination-item-active')).toBeTruthy();
  wrapper
    .find('.ux-pagination-options-quick-jumper')
    .find('input')
    .setValue('5');

  await triggerEvent(wrapper.find('.ux-pagination-options-quick-jumper').find('button'), 'click');
  expect(wrapper.find('.ux-pagination-item-5').classes('ux-pagination-item-active')).toBeTruthy();
});

it('render common correctly', async () => {
  const changeFn = jest.fn();
  const pageSizeChangeFn = jest.fn();
  const wrapper = mount(UxPagination, {
    propsData: {
      total: 100,
      pageSize: 10,
      showQuickJumper: true,
      showQuickJumperConfirmBtn: true,
      showSizeChanger: true,
      pageSizeOptions: [20, 30, 40],
      showBeforeTotal: () => 'beforeTotalMessage',
      showAfterTotal: () => 'afterTotalMessage',
    },
    listeners: {
      change: changeFn,
      'page-size-change': pageSizeChangeFn,
    },
  });
  await waitTime();
  expect(wrapper.findAll('.ux-pagination-item').length).toBe(5);
  expect(wrapper.contains('.ux-pagination-options-quick-jumper')).toBeTruthy();
  expect(wrapper.find('.ux-pagination-options-quick-jumper').contains('button')).toBeTruthy();
  expect(wrapper.find('.ux-pagination-before-total-text').element.innerHTML).toBe(
    'beforeTotalMessage'
  );
  expect(wrapper.find('.ux-pagination-after-total-text').element.innerHTML).toBe(
    'afterTotalMessage'
  );

  const selectWrapper = wrapper.find(Select);
  // wait animate
  await triggerEvent(selectWrapper, 'click', 300);

  const portal = await getPortal(selectWrapper);

  const items = portal.findAll('.ux-select-dropdown-menu-item');
  expect(items.length).toBe(3);
  expect(items.at(0).text()).toBe('20 条/页');
  expect(items.at(1).text()).toBe('30 条/页');
  expect(items.at(2).text()).toBe('40 条/页');
  // wait debounce time
  await triggerEvent(items.at(1), 'click', 60);
  expect(wrapper.findAll('.ux-pagination-item').length).toBe(4);
  expect(pageSizeChangeFn).toBeCalled();
  await triggerEvent(wrapper.findAll('.ux-pagination-item').at(1), 'click');

  expect(changeFn).toBeCalled();
  document.body.innerHTML = '';

});

it('render custom item dom correctly', () => {
  // eslint-disable-next-line
  const h = getVueCreateElement();
  const wrapper = mount(UxPagination, {
    propsData: {
      total: 30,
      pageSize: 10,
      itemRender: (pageNo, type, node) => {
        let text = '';
        switch (type) {
          case 'prev':
            text = '前一页';
            break;
          case 'next':
            text = '后一页';
            break;
          case 'page':
            text = `第${pageNo}页`;
            break;
          default:
            return node;
        }
        return <span>{text}</span>;
      },
    },
  });
  expect(wrapper.find('.ux-pagination-prev').find('span').element.innerHTML).toBe('前一页');
  expect(wrapper.find('.ux-pagination-next').find('span').element.innerHTML).toBe('后一页');
  expect(
    wrapper
      .findAll('.ux-pagination-item')
      .at(0)
      .find('span').element.innerHTML
  ).toBe('第1页');
  expect(
    wrapper
      .findAll('.ux-pagination-item')
      .at(1)
      .find('span').element.innerHTML
  ).toBe('第2页');
  expect(
    wrapper
      .findAll('.ux-pagination-item')
      .at(2)
      .find('span').element.innerHTML
  ).toBe('第3页');
});

it('watch props correctly', async () => {
  const wrapper = mount(UxPagination, {
    propsData: {
      current: 5,
      total: 500
    },
  });
  await waitTime();
  expect(wrapper.findAll('.ux-pagination-item').length).toBe(7);

  wrapper.setProps({pageSize: 20});
  wrapper.setProps({current: 10});
  await waitTime();
  expect(wrapper.find('li[title="25"]')).toBeDefined();
  await triggerEvent(wrapper.find('.ux-pagination-jump-prev'), 'click');
  expect(wrapper.find('li[title="3"]')).toBeDefined();
  await triggerEvent(wrapper.find('.ux-pagination-jump-next'), 'click');
  expect(wrapper.find('li[title="8"]')).toBeDefined();
  await triggerEvent(wrapper.find('li[title="25"]'), 'click');
  expect(wrapper.find('.ux-pagination-jump-next').exists()).toBeFalsy();
  await triggerEvent(wrapper.find('li[title="1"]'), 'click', 100);
  expect(wrapper.find('.ux-pagination-jump-prev').exists()).toBeFalsy();

});

