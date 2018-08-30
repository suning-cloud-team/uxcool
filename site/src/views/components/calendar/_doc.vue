<template>
  <div>
    <ux-heading level="2"
                id="api">API</ux-heading>

    <h3 class="mume-header"
        id="uxcalendar">UxCalendar</h3>

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
          <td>value</td>
          <td>设定值(v-model)</td>
          <td>Date</td>
          <td></td>
        </tr>
        <tr>
          <td>mode</td>
          <td>模式,可选值:
            <code>month</code>,
            <code>year</code>
          </td>
          <td>String</td>
          <td>'month'</td>
        </tr>
        <tr>
          <td>fullscreen</td>
          <td>是否全屏模式</td>
          <td>Boolean</td>
          <td>true</td>
        </tr>
        <tr>
          <td>date-cell-render</td>
          <td>自定义渲染日期单元格,覆盖整个单元格</td>
          <td>Function({current, value})=&gt;VNode</td>
          <td></td>
        </tr>
        <tr>
          <td>date-cell-content-render</td>
          <td>自定义渲染日期单元格内容</td>
          <td>Function({current,value})=&gt;VNode</td>
          <td></td>
        </tr>
        <tr>
          <td>month-cell-render</td>
          <td>自定义渲染月份单元格,覆盖整个单元格</td>
          <td>Function({current, value})=&gt;VNode</td>
          <td></td>
        </tr>
        <tr>
          <td>month-cell-content-render</td>
          <td>自定义渲染月份单元格内容</td>
          <td>Function({current, value})=&gt;VNode</td>
          <td></td>
        </tr>
        <tr>
          <td>locale</td>
          <td>国际化</td>
          <td>Object</td>
          <td></td>
        </tr>
        <tr>
          <td>valid-range</td>
          <td>有效日期范围</td>
          <td>Array&lt;Date,Date&gt;</td>
          <td></td>
        </tr>
        <tr>
          <td>disabled-date</td>
          <td>不可选择日期</td>
          <td>Function(current)=&gt;Boolean</td>
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
          <td>dateCellRender</td>
          <td>自定义渲染日期单元格,覆盖整个单元格(仅支持
            <code>slot-scope</code>)</td>
        </tr>
        <tr>
          <td>dateCellContentRender</td>
          <td>自定义渲染日期单元格内容(仅支持
            <code>slot-scope</code>)</td>
        </tr>
        <tr>
          <td>monthCellRender</td>
          <td>自定义渲染月份单元格,覆盖整个单元格(仅支持
            <code>slot-scope</code>)</td>
        </tr>
        <tr>
          <td>monthCellContentRender</td>
          <td>自定义渲染月份单元格内容(仅支持
            <code>slot-scope</code>)</td>
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
          <td>值改变时触发</td>
          <td>Function(value:Date)</td>
        </tr>
        <tr>
          <td>select</td>
          <td>选择时触发</td>
          <td>Function(value:Date,{target:String})</td>
        </tr>
        <tr>
          <td>panel-change</td>
          <td>面板头部区域选择变化时触发</td>
          <td>Function(value:Date,mode:String)</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>
