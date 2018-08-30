<template>
  <div>
    <ux-heading level="2"
                id="api">
      API
    </ux-heading>
    <h3 class="mume-header"
        id="uxselect">UxSelect</h3>

    <h4 class="mume-header"
        id="props">Props</h4>

    <table class="api-table">
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
          <td>data-source</td>
          <td>数据源</td>
          <td>Array</td>
          <td></td>
        </tr>
        <tr>
          <td>value</td>
          <td>选中值</td>
          <td>String|Number|Array</td>
          <td></td>
        </tr>
        <tr>
          <td>mode</td>
          <td>
            <code>Select</code>模式,可选值:
            <code>multiple</code> ,
            <code>tags</code>,
            <code>default</code>
          </td>
          <td>String</td>
          <td>default</td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>是否禁用</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>allow-clear</td>
          <td>是否显示清除按钮</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>show-search</td>
          <td>是否可搜索(
            <strong>仅在
              <code>mode=default</code>时有效</strong>)</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>placeholder</td>
          <td>搜索框占位符</td>
          <td>String</td>
          <td>Please Select</td>
        </tr>
        <tr>
          <td>show-arrow</td>
          <td>是否显示下拉箭头</td>
          <td>Boolean</td>
          <td>true</td>
        </tr>
        <tr>
          <td>popup-class</td>
          <td>自定义下拉面板类名</td>
          <td>String|Object|Array</td>
          <td></td>
        </tr>
        <tr>
          <td>popup-style</td>
          <td>自定义下拉面板样式</td>
          <td>Object</td>
          <td></td>
        </tr>
        <tr>
          <td>dropdown-match-select-width</td>
          <td>下拉面板与选择器同宽</td>
          <td>Boolean</td>
          <td>true</td>
        </tr>
        <tr>
          <td>dropdown-menu-style</td>
          <td>自定义下拉面板中的列表样式</td>
          <td>Object</td>
          <td></td>
        </tr>
        <tr>
          <td>get-container</td>
          <td>自定义下拉面板包裹容器</td>
          <td>Function()=&gt;HTMLElement</td>
          <td></td>
        </tr>
        <tr>
          <td>filter-option</td>
          <td>自定义过滤函数.当值为
            <code>false</code>时关闭内置过滤功能</td>
          <td>Boolean|Function(searchVal,option)</td>
          <td></td>
        </tr>
        <tr>
          <td>render-label</td>
          <td>自定义
            <code>label</code>渲染函数</td>
          <td>Function(option)=&gt;VNode</td>
          <td></td>
        </tr>
        <tr>
          <td>render-group-label</td>
          <td>自定义
            <code>group label</code>渲染函数</td>
          <td>Function(option)=&gt;VNode</td>
          <td></td>
        </tr>
        <tr>
          <td>size</td>
          <td>大小,可选值:
            <code>large</code>,
            <code>default</code>,
            <code>small</code>
          </td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>option-label-prop</td>
          <td>定义选择框显示的 Option 属性,可选值:
            <code>value</code>,
            <code>label</code>,
            <code>children</code>
          </td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>option-filter-prop</td>
          <td>定义过滤时对应的
            <code>Option</code>属性,可选值:
            <code>value</code>,
            <code>label</code>
          </td>
          <td>String</td>
          <td>value</td>
        </tr>
        <tr>
          <td>max-tag-count</td>
          <td>最多显示多少个
            <code>tag</code>
          </td>
          <td>Number|String</td>
          <td></td>
        </tr>
        <tr>
          <td>max-tag-placeholder</td>
          <td>隐藏多余
            <code>tag</code>时,显示的文案</td>
          <td>String|Function(extraOptions)=&gt;VNode</td>
          <td></td>
        </tr>
        <tr>
          <td>not-found-content</td>
          <td>列表为空时显示内容</td>
          <td>String|Object</td>
          <td>Not Found</td>
        </tr>
        <tr>
          <td>clear-disabled</td>
          <td>是否允许清除选择框中的
            <code>disabled</code>选项</td>
          <td>Boolean</td>
          <td>true</td>
        </tr>
        <tr>
          <td>token-separator-prop</td>
          <td>
            <code>tags</code>和
            <code>multiple</code>模式下,分割字符对应的
            <code>Option</code>属性,可选值:
            <code>value</code>,
            <code>label</code>
          </td>
          <td>String</td>
          <td>label</td>
        </tr>
        <tr>
          <td>token-separators</td>
          <td>定义
            <code>tags</code>和
            <code>multiple</code>模式下,自定分词的分隔符</td>
          <td>Array</td>
          <td></td>
        </tr>
        <tr>
          <td>lazy</td>
          <td>
            <code>lazy</code>模式,可设置
            <code>Object{height: 32, remain: 8}</code>,
            <code>height</code>:每行数据高度,
            <code>remain</code>:保留多少行(设置后可自动撑开高度),或
            <code>false</code>关闭
            <code>lazy</code>模式</td>
          <td>{height: 32, remain: 8}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <h4 class="mume-header"
        id="slots">Slots</h4>

    <table class="api-table">
      <thead>
        <tr>
          <th>名称</th>
          <th>描述</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>renderGroupLabel</td>
          <td>自定义
            <code>group label</code>渲染函数(
            <strong>仅支持 slot-scope</strong>)</td>
        </tr>
        <tr>
          <td>renderLabel</td>
          <td>自定义
            <code>label</code>渲染 (
            <strong>仅支持 slot-scope</strong>)</td>
        </tr>
      </tbody>
    </table>
    <h4 class="mume-header"
        id="events">Events</h4>

    <table class="api-table">
      <thead>
        <tr>
          <th>事件名</th>
          <th>描述</th>
          <th>回调</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>change</td>
          <td>选中值变化时触发</td>
          <td>Function(values, options ))</td>
        </tr>
        <tr>
          <td>popup-visible-change</td>
          <td>下拉面板显示/隐藏时触发</td>
          <td>Function(visible)</td>
        </tr>
        <tr>
          <td>select</td>
          <td>选中
            <code>option</code>时触发</td>
          <td>Function(value, option)</td>
        </tr>
        <tr>
          <td>deselect</td>
          <td>
            <code>tags</code>和
            <code>multiple</code>模式时,
            <code>option</code>取消选中时触发</td>
          <td>Function(value, option)</td>
        </tr>
        <tr>
          <td>scroll</td>
          <td>下拉面板滚动时触发</td>
          <td>Function(e)</td>
        </tr>
        <tr>
          <td>search</td>
          <td>搜索值变化时触发</td>
          <td>Function(searchValue)</td>
        </tr>
      </tbody>
    </table>
    <h3 class="mume-header"
        id="uxoption">UxOption</h3>

    <h4 class="mume-header"
        id="props-1">Props</h4>

    <table class="api-table">
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
          <td>value</td>
          <td>属性值(
            <strong>唯一键</strong>),required</td>
          <td>String|Number</td>
          <td></td>
        </tr>
        <tr>
          <td>label</td>
          <td>标签</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>是否禁用</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
      </tbody>
    </table>
    <h3 class="mume-header"
        id="uxoptiongroup">UxOptionGroup</h3>

    <h4 class="mume-header"
        id="props-2">Props</h4>

    <table class="api-table">
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
          <td>label</td>
          <td>标签, required</td>
          <td>String</td>
          <td></td>
        </tr>
      </tbody>
    </table>

  </div>

</template>
