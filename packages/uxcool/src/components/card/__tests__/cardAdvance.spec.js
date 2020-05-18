import { mount } from '@cloud-sn/v-test-utils';
import { UxCardAdvance, UxCardMeta, UxCardGrid } from '../index';

it('render correctly with props', () => {
  const wrapper = mount({
    render() {
      return (
        <UxCardAdvance title="title">
          <UxCardMeta title="meta-title" />
        </UxCardAdvance>
      );
    },
  });
  expect(wrapper.contains('.ux-card-advance-head-title')).toBeTruthy();
  expect(wrapper.find('.ux-card-advance-head-title').element.innerHTML).toBe('title');
  expect(wrapper.contains('.ux-card-advance-meta-title')).toBeTruthy();
  expect(wrapper.find('.ux-card-advance-meta-title').element.innerHTML).toBe('meta-title');
});
// 带图片
it('render correctly with slots', () => {
  const wrapper = mount({
    render() {
      return (
        <UxCardAdvance>
          <img slot="cover" src="https://image4.suning.cn/uimg/cms/img/155540698836163295.png" />
          <UxCardMeta>
            <template slot="avatar">avatar</template>
          </UxCardMeta>
        </UxCardAdvance>
      );
    },
  });
  expect(wrapper.contains('.ux-card-advance-cover')).toBeTruthy();
  expect(wrapper.find('.ux-card-advance-cover').element.children[0].tagName).toBe('IMG');
  expect(wrapper.find('.ux-card-advance-cover').element.children[0].getAttribute('src')).toBe('https://image4.suning.cn/uimg/cms/img/155540698836163295.png');
  expect(wrapper.contains('.ux-card-advance-meta-avatar')).toBeTruthy();
  expect(wrapper.find('.ux-card-advance-meta-avatar').element.innerHTML).toBe('avatar');
});

it('render style correctly', () => {
  const wrapper = mount({
    render() {
      return (
        <UxCardAdvance title="title" bordered={false} hoverable>
          <UxCardMeta title="meta-title" />
        </UxCardAdvance>
      );
    },
  });
  expect(wrapper.classes('ux-card-advance-bordered')).not.toBeTruthy();
  expect(wrapper.classes('ux-card-advance-hoverable')).toBeTruthy();
});

it('render grid correctly', () => {
  const wrapper = mount({
    render() {
      return (
        <UxCardAdvance title="this is title">
          <UxCardGrid style="width: 50%" />
          <UxCardGrid style="width: 50%" />
        </UxCardAdvance>
      );
    },
  });
  expect(wrapper.contains('.ux-card-advance-contain-grid')).toBeTruthy();
  expect(wrapper.find('.ux-card-advance-grid').element.style.width).toBe('50%');
  expect(wrapper.findAll('.ux-card-advance-grid').length).toBe(2);
});
