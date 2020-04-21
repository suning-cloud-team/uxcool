import {
  mount,
  waitTime,
  getVueCreateElement,
  triggerEvent,
  getPortal,
} from '@suning/v-test-utils';
import VPagination from '../index';
// import Select from '../../../uxcool/src/select/index';

it('render simple correctly', () => {
  const wrapper = mount(VPagination, {
    propsData: {
      simple: true,
      total: 100,
      pageSize: 10,
    },
  });
  expect(wrapper.findAll('button').length).toBe(0);
});

it('button works correctly', async () => {
  const wrapper = mount(VPagination, {
    propsData: {
      total: 100,
      pageSize: 10,
      showQuickJumper: true,
      showQuickJumperConfirmBtn: true,
    },
  });
  await waitTime();
  expect(wrapper.find('.ux-pagination-item-1').classes('v-pagination-item-active')).toBeFalsy();
  await triggerEvent(wrapper.find('.ux-pagination-item-2'), 'click');
  expect(wrapper.find('.ux-pagination-item-2').classes('v-pagination-item-active')).toBeFalsy();
  await triggerEvent(wrapper.find('.ux-pagination-next'), 'click');
  expect(wrapper.find('.ux-pagination-item-3').classes('v-pagination-item-active')).toBeFalsy();
  await triggerEvent(wrapper.find('.ux-pagination-prev'), 'click');
  expect(wrapper.find('.ux-pagination-item-2').classes('v-pagination-item-active')).toBeFalsy();
  wrapper
    .find('.ux-pagination-options-quick-jumper')
    .find('input')
    .setValue('5');

  await triggerEvent(wrapper.find('.ux-pagination-options-quick-jumper').find('button'), 'click');
  expect(wrapper.find('.ux-pagination-item-5').classes('v-pagination-item-active')).toBeFalsy();
});

it('render common correctly', async () => {
  const changeFn = jest.fn();
  const pageSizeChangeFn = jest.fn();
  const wrapper = mount(VPagination, {
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
  expect(wrapper.findAll('.ux-pagination-item').length).toBe(6);
  expect(wrapper.contains('.ux-pagination-options-quick-jumper')).toBeTruthy();
  expect(wrapper.find('.ux-pagination-options-quick-jumper').contains('button')).toBeTruthy();
  expect(wrapper.find('.ux-pagination-before-total-text').element.innerHTML).toBe(
    'beforeTotalMessage'
  );
  expect(wrapper.find('.ux-pagination-after-total-text').element.innerHTML).toBe(
    'afterTotalMessage'
  );

  // const selectWrapper = wrapper.find(Select);
  // // wait animate
  // await triggerEvent(selectWrapper, 'click', 300);

  // const portal = await getPortal(selectWrapper);

  // const items = portal.findAll('.ux-select-dropdown-menu-item');
  // expect(items.length).toBe(3);
  // expect(items.at(0).text()).toBe('20 条/页');
  // expect(items.at(1).text()).toBe('30 条/页');
  // expect(items.at(2).text()).toBe('40 条/页');
  // // wait debounce time
  // await triggerEvent(items.at(1), 'click', 60);
  // expect(wrapper.findAll('.ux-pagination-item').length).toBe(4);
  // expect(pageSizeChangeFn).toBeCalled();
  // await triggerEvent(wrapper.findAll('.ux-pagination-item').at(1), 'click');

  // expect(changeFn).toBeCalled();
  // document.body.innerHTML = '';
});

it('render custom item dom correctly', () => {
  // eslint-disable-next-line
  const h = getVueCreateElement();
  const wrapper = mount(VPagination, {
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
  const wrapper = mount(VPagination, {
    propsData: {
      current: 5,
      total: 500,
    },
  });
  await waitTime();
  expect(wrapper.findAll('.ux-pagination-item').length).toBe(7);

  wrapper.setProps({ pageSize: 20 });
  wrapper.setProps({ current: 10 });
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

// import { isFunction } from '@suning/v-utils';
// import { mount, waitTime, destroyWrapper } from '@suning/v-test-utils';

// import { VPagination } from '../index';

// const locale = {
//   items_per_page: '条/页',
//   jump_to: '跳至',
//   page: '页',

//   prev_page: '上一页',
//   next_page: '下一页',
//   prev_5: '向前 5 页',
//   next_5: '向后 5 页',
//   prev_3: '向前 3 页',
//   next_3: '向后 3 页',
//   confirm: '确定',
// };
// function defaultItemRender(page, type, node) {
//   return node;
//   // return `<a>${type === 'page' ? page : ''}</a>`;
// }

// function noop() {}

// function isInteger(val) {
//   return typeof val === 'number' && Number.isFinite(val) && Math.floor(val) === val;
// }
// const pagerTpl = {
//   type: 'pager',
//   prefixCls: '',
//   onClick: noop,
//   onKeyPress: noop,
//   key: 1,
//   page: 1,
//   active: false,
//   showTitle: true,
// };

// const paginationWrapper = {
//   props: {
//     prefixCls: {
//       type: String,
//       default: 'ux-pagination',
//     },
//     styles: {
//       type: Object,
//       default: null,
//     },
//     className: String,
//     size: {
//       type: String,
//       default: '',
//     },
//     simple: {
//       type: Boolean,
//       default: false,
//     },
//     current: {
//       type: Number,
//       default: 1,
//     },
//     total: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//     pageSize: {
//       type: Number,
//       default: 10,
//     },
//     showSizeChanger: {
//       type: Boolean,
//       default: false,
//     },
//     onShowSizeChange: {
//       type: Function,
//       default: noop,
//     },
//     showLessItems: {
//       type: Boolean,
//       default: false,
//     },
//     selectComponentClass: Object,
//     showQuickJumper: {
//       type: Boolean,
//       default: false,
//     },
//     showQuickJumperConfirmBtn: {
//       type: Boolean,
//       default: true,
//     },
//     showTitle: {
//       type: Boolean,
//       default: true,
//     },
//     pageSizeOptions: Array,
//     showBeforeTotal: {
//       type: Function,
//       default: noop,
//     },
//     showAfterTotal: {
//       type: Function,
//       default: noop,
//     },
//     itemRender: {
//       type: Function,
//       default: defaultItemRender,
//     },
//     mode: {
//       type: String,
//       default: 'normal',
//       validator(val) {
//         return ['normal', 'stream'].indexOf(val) > -1;
//       },
//     },
//     pageBufferSize: {
//       type: Number,
//       default: undefined,
//     },
//     renderPrevIcon: {
//       type: Function,
//       default: undefined,
//     },
//     renderNextIcon: {
//       type: Function,
//       default: undefined,
//     },
//     renderJumpPrevIcon: {
//       type: Function,
//       default: undefined,
//     },
//     renderJumpNextIcon: {
//       type: Function,
//       default: undefined,
//     },
//   },
//   methods: {
//     onChange() {},
//   },
//   render() {
//     const {
//       showQuickJumper, current, pageSize, total, showBeforeTotal, pageSizeOptions
//     } = this;
//     return (
//       <VPagination
//         showQuickJumper={showQuickJumper}
//         current={current}
//         pageSize={pageSize}
//         total={total}
//         showBeforeTotal={showBeforeTotal}
//         pageSizeOptions={pageSizeOptions}
//         showSizeChanger
//       ></VPagination>
//     );
//   },
// };

// describe('textarea', () => {
//   it('render paginationWrapper correctly', async () => {
//     const wrapper = await mount(paginationWrapper, {
//       propsData: {
//         total: 100,
//       },
//     });
//     await waitTime();
//     expect(wrapper.is('.ux-pagination')).toBe(true);
//   });

//   // it('test keydown event', () => {
//   //   const wrapper = mount(paginationWrapper);
//   //   wrapper.trigger('keydown', {
//   //     key: 'a',
//   //   });
//   //   wrapper.trigger('keydown.enter');
//   //   destroyWrapper(wrapper);
//   // });

//   // it('render without props', async () => {
//   //   const wrapper = mount({
//   //     render() {
//   //       return <VTextarea></VTextarea>;
//   //     },
//   //   });
//   //   await waitTime();
//   //   expect(wrapper.is('.v-pagination')).toBe(true);
//   // });
// });
