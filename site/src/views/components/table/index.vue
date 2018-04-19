<template>
  <article class="doc">
    <h1 class="ux-heading">Table
      <span class="subtitle">表格</span>
    </h1>
    <ux-heading level="2"
                id="overview">概览</ux-heading>
    <normal-demo/>
    <selection-single-demo/>
    <selection-demo/>
    <selection-row-demo/>
    <selection-op-demo/>
    <selection-custom-demo/>
    <sort-filter-demo/>
    <sort-filter-reset-demo/>
    <custom-filter-panel-demo/>
    <filter-demo />
    <ajax-demo/>
    <size-demo/>
    <border-title-footer-demo/>
    <expander-row-demo/>
    <colspan-rowspan-demo/>
    <tree-data-demo/>
    <fixed-header-demo/>
    <fixed-columns-demo/>
    <fixed-columns-header-demo/>
    <group-header-demo/>
    <editable-cells-demo/>
    <editable-rows-demo/>
    <nest-table-demo/>
    <async-nest-table-demo/>
    <hr>

    <ux-heading level="2"
                id="api">API</ux-heading>

    <table class="api-table">
      <caption>UxTable Props</caption>
      <thead>
        <tr>
          <th>参数名</th>
          <th>描述</th>
          <th>类型</th>
          <th>默认</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>title</td>
          <td>表格标题</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>hide-header</td>
          <td>是否隐藏表头</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>footer</td>
          <td>表格尾部</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>columns</td>
          <td>表格列配置</td>
          <td>Array</td>
          <td></td>
        </tr>
        <tr>
          <td>value</td>
          <td>表格数据</td>
          <td>Array</td>
          <td></td>
        </tr>
        <tr>
          <td>empty-text</td>
          <td>空数据文案</td>
          <td>String</td>
          <td>暂无数据</td>
        </tr>
        <tr>
          <td>scroll</td>
          <td>设置横向或纵向滚动, 可指定具体值
            <code>{x:'110%', y:250}</code>
          </td>
          <td>Object{x,y}</td>
          <td>{x:false, y:false}</td>
        </tr>
        <tr>
          <td>row-key</td>
          <td>表格数据行 key 的取值,可以是字符串或函数</td>
          <td>Function|String</td>
          <td>'key'</td>
        </tr>
        <tr>
          <td>indent-size</td>
          <td>展示树形数据时,每层的缩进, 单位
            <code>px</code>
          </td>
          <td>Number|String</td>
          <td>15</td>
        </tr>
        <tr>
          <td>row-class</td>
          <td>设置数据行 class</td>
          <td>String|Object|Array|Function(record,rowIdx)</td>
          <td></td>
        </tr>
        <tr>
          <td>expand-row-by-click</td>
          <td>通过点击行来展开数据</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>expanded-row-render</td>
          <td>额外展开行渲染函数</td>
          <td>Function(record, rowIdx)</td>
          <td></td>
        </tr>
        <tr>
          <td>expanded-row-keys</td>
          <td>控制行展开, 值为相应行的 key</td>
          <td>Array</td>
          <td></td>
        </tr>
        <tr>
          <td>expand-all-rows</td>
          <td>展开所有行</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>row-selection</td>
          <td>配置列表项选择</td>
          <td>Object</td>
          <td></td>
        </tr>
        <tr>
          <td>size</td>
          <td>表格大小,可选值为
            <code>default</code>,
            <code>middle</code>,
            <code>small</code>
          </td>
          <td>String</td>
          <td>default</td>
        </tr>
        <tr>
          <td>bordered</td>
          <td>是否展示边框</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>pagination</td>
          <td>分页(具体配置参见 Pagination 组件)</td>
          <td>Object|Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>loading</td>
          <td>是否显示加载中(具体配置,参见 Spin 组件)</td>
          <td>Object|Boolean</td>
          <td></td>
        </tr>
        <tr>
          <td>on-row</td>
          <td>设置行属性</td>
          <td>Function(columns, rowIdx)</td>
          <td></td>
        </tr>
        <tr>
          <td>on-header-row</td>
          <td>设置头部行属性</td>
          <td>Function (record, rowIdx)</td>
          <td></td>
        </tr>
      </tbody>
    </table>

    <table class="api-table">
      <caption>
        <code>UxTable/</code> columns 属性</caption>
      <thead>
        <tr>
          <th>参数名</th>
          <th>描述</th>
          <th>类型</th>
          <th>默认</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>fixed</td>
          <td>是否固定，可选
            <code>true</code>(等效于
            <code>left</code>)
            <code>left</code>,
            <code>right</code>
          </td>
          <td>Boolean|String</td>
          <td>false</td>
        </tr>
        <tr>
          <td>key</td>
          <td>唯一性标识(必须)</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>title</td>
          <td>header 列名</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>dataIndex</td>
          <td>列数据索引,对应数据中的键名</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>colspan</td>
          <td>表头列合并, 值为 0 时,不渲染</td>
          <td>Number</td>
          <td></td>
        </tr>
        <tr>
          <td>className</td>
          <td>自定义 header class</td>
          <td>String|Object|Array</td>
          <td></td>
        </tr>
        <tr>
          <td>width</td>
          <td>列宽</td>
          <td>Number</td>
          <td></td>
        </tr>
        <tr>
          <td>align</td>
          <td>对齐方式(center| left|right)</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>onHeaderCell</td>
          <td>自定义 渲染 header cell 属性 ,支持自定义事件{on:{click(){}}}</td>
          <td>Function(column, rowIdx,colIdx)=&gt;Object</td>
          <td></td>
        </tr>
        <tr>
          <td>onCell</td>
          <td>自定义渲染 cell 属性 ,支持自定义属性和事件</td>
          <td>Function(record, rowIdx, column, colIdx)=&gt;Object</td>
          <td></td>
        </tr>
        <tr>
          <td>cellRender</td>
          <td>数据 cell 内容渲染,支持自定义属性和事件 ,class 字段名请用
            <code>className</code> 代替
          </td>
          <td>Function(text, record, rowIdx,column, colIdx)=&gt;Object</td>
          <td></td>
        </tr>
        <tr>
          <td>filters</td>
          <td>表头的筛选菜单项</td>
          <td>Object[]</td>
          <td></td>
        </tr>
        <tr>
          <td>onFilter</td>
          <td>非服务端排序时,使用此函数筛选(非服务端排序模式时必须)</td>
          <td>Function(filterVal, record, column)</td>
          <td></td>
        </tr>
        <tr>
          <td>filterDropdown</td>
          <td>自定义筛选下拉框</td>
          <td>Function</td>
          <td></td>
        </tr>
        <tr>
          <td>filterDropdownVisible</td>
          <td>控制筛选下拉框是否可见</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>filtered</td>
          <td>当过滤时筛选图标是否高亮</td>
          <td>Boolan</td>
          <td>true</td>
        </tr>
        <tr>
          <td>filteredValue</td>
          <td>筛选的受控属性，外界可用此控制列的筛选状态，值为已筛选的 value 数组;需要与 table 的
            <code>change</code> 事件配合使用
          </td>
          <td>String[]</td>
          <td></td>
        </tr>
        <tr>
          <td>filterIcon</td>
          <td>自定义 filter 图标</td>
          <td>Function</td>
          <td></td>
        </tr>
        <tr>
          <td>filterMultiple</td>
          <td>是否可多选</td>
          <td>Boolean</td>
          <td>true</td>
        </tr>
        <tr>
          <td>onFilterDropdownVisibleChange</td>
          <td>筛选菜单显示隐藏时回调</td>
          <td>Function(visible)</td>
          <td></td>
        </tr>
        <tr>
          <td>sorter</td>
          <td>排序函数，本地排序使用一个函数(参考 Array.sort 的
            <code>compareFunction</code>)，如需服务端排序可设为 true
          </td>
          <td>Function|Boolean</td>
          <td></td>
        </tr>
        <tr>
          <td>sortOrder</td>
          <td>设置排序为受控属性,外部可用此属性控制列的排序,可选值:
            <code>ascend</code>,
            <code>descend</code>,
            <code>false</code>
          </td>
          <td>Boolean|String</td>
          <td></td>
        </tr>
      </tbody>
    </table>

    <table class="api-table">
      <caption>
        <code>UxTable/</code>row-selections 属性</caption>
      <thead>
        <tr>
          <th>参数名</th>
          <th>描述</th>
          <th>类型</th>
          <th>默认</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>fixed</td>
          <td>选择框是否浮动在左边</td>
          <td>Boolean</td>
          <td></td>
        </tr>
        <tr>
          <td>getCheckboxProps</td>
          <td>选择框默认属性</td>
          <td>Function=&gt;Object</td>
          <td></td>
        </tr>
        <tr>
          <td>selections</td>
          <td>自定义下拉选择项,值为 true 时,使用默认选择项</td>
          <td>Object[]| Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>hideDefaultSelections</td>
          <td>是否隐藏默认选择项</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>selectedRowKeys</td>
          <td>指定选中项 key 的数组, 需和
            <code>rowSlection.onChange</code>配合使用
          </td>
          <td>String[]</td>
          <td></td>
        </tr>
        <tr>
          <td>columnWidth</td>
          <td>设置选择框 列宽, 设置为 0 无效</td>
          <td>String|Number</td>
          <td></td>
        </tr>
        <tr>
          <td>type</td>
          <td>单选(radio)/多选(checkbox)</td>
          <td>String</td>
          <td>checkbox</td>
        </tr>
        <tr>
          <td>onChange</td>
          <td>选项发生变化时回调</td>
          <td>Function(selectedRowKeys,selectedRowsx )</td>
          <td></td>
        </tr>
        <tr>
          <td>onSelect</td>
          <td>手动选中/取消某行时回调</td>
          <td>Function(record,checked, selectedRows, domEvent)</td>
          <td></td>
        </tr>
        <tr>
          <td>onSelectAll</td>
          <td>手动选择/取消所有行时回调</td>
          <td>Function(checked, selectedRows, changeRows,selectedRowKeys)</td>
          <td></td>
        </tr>
        <tr>
          <td>onSelectInvert</td>
          <td>手动反选时回调</td>
          <td>Function(selectedRows, selectedRowKeys)</td>
          <td></td>
        </tr>
      </tbody>
    </table>

    <table class="api-table">
      <caption>
        <code>UxTable/row-selection/</code>selections 属性</caption>
      <thead>
        <tr>
          <th>参数名</th>
          <th>描述</th>
          <th>类型</th>
          <th>默认</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>key</td>
          <td>唯一标识(必须)</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>text</td>
          <td>选择项文字</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>onSelect</td>
          <td>选择项点击回调</td>
          <td>Function(changeableKeys)</td>
          <td></td>
        </tr>
      </tbody>
    </table>

    <table class="api-table">
      <caption>
        <code>UxTable/</code>pagination 属性</caption>
      <thead>
        <tr>
          <th>参数名</th>
          <th>描述</th>
          <th>类型</th>
          <th>默认</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>position</td>
          <td>指定分页位置,可选值:
            <code>top</code>,
            <code>bottom</code>,
            <code>both</code>,
            <code>none</code>
          </td>
          <td>String</td>
          <td>bottom</td>
        </tr>
      </tbody>
    </table>
    <p>更多配置,请查看
      <a href="/vue/index.html#/components/pagintaion">
        <code>Pagination</code>
      </a>
      组件。
    </p>
    <h3 class="mume-header"
        id="onrow-onheaderrow-oncell-onheadercell-%E7%94%A8%E6%B3%95">onRow, onHeaderRow, onCell, onHeaderCell 用法</h3>
    <p>
      <code>onRow</code>,
      <code>onHeaderRow</code> 在
      <code>table</code> 上设置;
      <code>onCell</code>,
      <code>onHeaderCell</code> 在
      <code>column</code> 中设置, 两者用法类似:
    </p>

    <ux-code non-copyable>{{code}}</ux-code>

    <table class="api-table">
      <caption>UxTable Slots</caption>
      <thead>
        <tr>
          <th>名称</th>
          <th>描述</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>title</td>
          <td>表格 标题 slot,支持 slot-scope</td>
        </tr>
        <tr>
          <td>empty</td>
          <td>表格数据为空时 slot</td>
        </tr>
        <tr>
          <td>footer</td>
          <td>表格 footer slot</td>
        </tr>
        <tr>
          <td>expand</td>
          <td>展开行 slot,只支持 slot-scope</td>
        </tr>
      </tbody>
    </table>

    <table class="api-table">
      <caption>UxTable Events</caption>
      <thead>
        <tr>
          <th>事件名</th>
          <th>描述</th>
          <th>类型</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>expanded-row-change</td>
          <td>展开/收缩行时触发</td>
          <td>Function(expandRows)</td>
        </tr>
        <tr>
          <td>expand</td>
          <td>展开/收缩行时触发</td>
          <td>Function(expanded, record)</td>
        </tr>
        <tr>
          <td>change</td>
          <td>分页,排序, 筛选变化时触发</td>
          <td>Function(pagination, filter, sorter)</td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
  import NormalDemo from './normal.vue';
  import SelectionSingleDemo from './selectionSingle.vue';
  import SelectionDemo from './selection.vue';
  import SelectionRowDemo from './selectionRow.vue';
  import SelectionOpDemo from './selectionOp.vue';
  import SelectionCustomDemo from './selectionCustom.vue';
  import SortFilterDemo from './sortFilter.vue';
  import SortFilterResetDemo from './sortFilterReset.vue';
  import CustomFilterPanelDemo from './customFilterPanel.vue';
  import AjaxDemo from './ajax.vue';
  import SizeDemo from './size.vue';
  import FilterDemo from './filter.vue';
  import BorderTitleFooterDemo from './borderTitleFooter.vue';
  import ExpanderRowDemo from './expanderRow.vue';
  import ColspanRowspanDemo from './colSpanRowSpan.vue';
  import TreeDataDemo from './treeData.vue';
  import FixedHeaderDemo from './fixedHeader.vue';
  import FixedColumnsDemo from './fixedColumns.vue';
  import FixedColumnsHeaderDemo from './fixedColumnsHeader.vue';
  import GroupHeaderDemo from './groupHeader.vue';
  import EditableCellsDemo from './editableCells.vue';
  import EditableRowsDemo from './editableRows.vue';
  import NestTableDemo from './nestTable.vue';
  import AsyncNestTableDemo from './asyncNestTable.vue';

  export default {
    components: {
      NormalDemo,
      SelectionSingleDemo,
      SelectionDemo,
      SelectionRowDemo,
      SelectionOpDemo,
      SelectionCustomDemo,
      SortFilterDemo,
      SortFilterResetDemo,
      CustomFilterPanelDemo,
      AjaxDemo,
      SizeDemo,
      FilterDemo,
      BorderTitleFooterDemo,
      ExpanderRowDemo,
      ColspanRowspanDemo,
      TreeDataDemo,
      FixedHeaderDemo,
      FixedColumnsDemo,
      FixedColumnsHeaderDemo,
      GroupHeaderDemo,
      EditableCellsDemo,
      EditableRowsDemo,
      NestTableDemo,
      AsyncNestTableDemo,
    },
    data() {
      return {
        code:
          '<ux-table v-bind:on-row="{ prop: \'\', on: { click(record) {}, mouseenter() {} } }" />',
      };
    },
  };
</script>
