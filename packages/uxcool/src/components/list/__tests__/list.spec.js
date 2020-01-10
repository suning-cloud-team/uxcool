import { mount, waitTime } from '@suning/v-test-utils';
import { UxList, UxListItem, UxListItemMeta } from '..';
import UxAvatar from '../../avatar';

describe('list', () => {
  it('render correctly', async () => {
    const wrapper = mount({
      template: `
      <ux-list :data-source="dataSource" ref="uxList">
        <template slot="header">this is header</template>
        <ux-list-item slot="renderItem" slot-scope="{item}">
          <span slot="actions">edit</span>
          <span slot="actions">more</span>
          <ux-list-item-meta>
            <ux-avatar slot="avatar">A</ux-avatar>
            <span slot="title">{{ item.title }}</span>
            <span slot="desc">{{ item.desc }}</span>
          </ux-list-item-meta>
        </ux-list-item>
        <template slot="footer">this is footer</template>
        <span slot="loadMore" class="loadMore">this is load more</span>
        <template slot="emptyText">this is empty text</template>
      </ux-list>
    `,
      components: {
        UxList,
        UxListItem,
        UxListItemMeta,
        UxAvatar,
      },
      data() {
        return {
          dataSource: [
            { title: 'title0', desc: 'desc0' },
            { title: 'title1', desc: 'desc1' },
            { title: 'title2', desc: 'desc2' },
            { title: 'title3', desc: 'desc3' },
          ],
        };
      },
    });
    await waitTime();
    const uxListWrapper = wrapper.find({ ref: 'uxList' });
    expect(wrapper.find('.ux-list-header').text()).toBe('this is header');
    expect(wrapper.find('.ux-list-footer').text()).toBe('this is footer');
    expect(wrapper.find('.loadMore').text()).toBe('this is load more');
    expect(wrapper.contains('.ux-avatar')).toBeTruthy();
    expect(wrapper.findAll('.ux-list-item').length).toBe(4);
    [0, 1, 2, 3].forEach((i) => {
      expect(
        wrapper
          .findAll('.ux-list-item-meta-title')
          .at(i)
          .find('span')
          .text()
      ).toBe(`title${i}`);
      expect(
        wrapper
          .findAll('.ux-list-item-meta-description')
          .at(i)
          .find('span')
          .text()
      ).toBe(`desc${i}`);
    });

    uxListWrapper.setProps({ dataSource: [] });
    await waitTime();
    expect(wrapper.find('.ux-list-empty-text').text()).toBe('this is empty text');

    uxListWrapper.setProps({ loading: true });
    await waitTime();
    expect(wrapper.find('.ux-spin').element.style.display).toBe('');
  });

  // pagniation加载时总是报错
  it('render pagination correctly', () => {
    // TODO
  });
});
