import { mount, waitTime } from '@cloud-sn/v-test-utils';
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
  it('render pagination correctly', async () => {
    // TODO
    const pageChangeFn = jest.fn();
    const onChangeFn = jest.fn();
    const wrapper = mount({
      template: `
        <ux-list :data-source="descs"
                  @pagination-change="pageChange"
                 :pagination="pagination">
          <template slot="renderItem"
                    slot-scope="{item}">
            <ux-list-item>
              <span slot="actions">edit</span>
              <span slot="actions">more</span>
              <ux-list-item-meta>
                <ux-avatar slot="avatar">A</ux-avatar>
                <span slot="title">{{ item.title }}</span>
                <span slot="desc">{{ item.desc }}</span>
              </ux-list-item-meta>
            </ux-list-item>
          </template>
        </ux-list>          
        `,
      components: {
        UxList,
        UxListItem,
        UxListItemMeta,
        UxAvatar
      },
      data() {
        return {
          pagination: { position: 'top', onChange: onChangeFn },
          descs: undefined,
          pageChange: pageChangeFn
        };
      },
      methods: {
        setDataSource() {
          this.descs = this.mockData(21);
        },
        mockData(cnt = 10) {
          return Array(cnt)
            .fill(0)
            .map((_, i) => ({
              title: `title-${i}`,
              desc: `description-${i}`,
            }));
        },
      }
    });
    await waitTime();
    expect(wrapper.find('.ux-spin-container').text()).toBe('暂无数据');
    expect(wrapper.find('.ux-pagination').exists()).toBeTruthy();
    wrapper.vm.setDataSource();
    await waitTime();
    expect(wrapper.findAll('.ux-pagination-item').length).toBe(3);
    expect(wrapper.findAll('.ux-list-item').length).toBe(10);
    wrapper.findAll('.ux-pagination-item').at(2).trigger('click');
    await waitTime();
    expect(pageChangeFn).toHaveBeenCalled();
    expect(onChangeFn).toHaveBeenCalled();
    wrapper.setData({ pagination: { position: 'both' } });
    await waitTime();
    expect(wrapper.findAll('.ux-pagination').length).toBe(2);
    wrapper.destroy();
  });

  it('render grid correctly', async () => {
    const wrapper = mount({
      template: `
        <ux-list :data-source="descs"
                 :grid="grid">
          <ux-list-item slot="renderItem"
                        slot-scope="{item}"
                        style="height: 130px"
                        class="aaa-aa"
                        item-layout="vertical">
            <ux-list-item-meta>
              <ux-avatar slot="avatar">A</ux-avatar>
              <span slot="title">{{ item.title }}</span>
              <span slot="desc">{{ item.desc }}</span>
            </ux-list-item-meta>
             <span slot="extra">extra content</span>
          </ux-list-item>
        </ux-list>          
        `,
      components: {
        UxList,
        UxListItem,
        UxListItemMeta,
        UxAvatar
      },
      data() {
        return {
          descs: [
            {
              title: 'title1',
              desc: 'Racing car sprays burning fuel into crowd.',
            },
            {
              title: 'title2',
              desc: 'Japanese princess to wed commoner.',
            },
            {
              title: 'title3',
              desc: 'Australian walks 100km after outback crash.',
            },
            {
              title: 'title4',
              desc: 'Man charged over missing wedding girl.',
            },
            {
              title: 'title4',
              desc: 'Los Angeles battles huge wildfires.',
            },
          ],
          grid: {
            column: 4,
            gutter: 8,
          },
        };
      },
    });
    await waitTime();
    expect(wrapper.findAll('.ux-col-6').length).toBe(5);
    expect(wrapper.findAll('.ux-list-item-extra').at(0).text()).toBe('extra content');
  });
});
