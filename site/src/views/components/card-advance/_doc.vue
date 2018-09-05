<template>
  <div>

    <ux-heading level="2"
                id="api">API</ux-heading>

    <h3 class="mume-header"
        id="uxcardadvance">UxCardAdvance</h3>

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
          <td>title</td>
          <td>标题</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>extra</td>
          <td>卡片右上角内容</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>bordered</td>
          <td>是否有边框</td>
          <td>Boolean</td>
          <td>true</td>
        </tr>
        <tr>
          <td>head-style</td>
          <td>自定义表头样式</td>
          <td>Object</td>
          <td></td>
        </tr>
        <tr>
          <td>body-style</td>
          <td>自定义内容区样式</td>
          <td>Object</td>
          <td></td>
        </tr>
        <tr>
          <td>hoverable</td>
          <td>是否有浮动效果</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>type</td>
          <td>卡片类型,可选值:
            <code>inner</code>或空</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>cover</td>
          <td>卡片封面</td>
          <td>String</td>
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
          <td>title</td>
          <td>标题</td>
        </tr>
        <tr>
          <td>extra</td>
          <td>卡片右上角内容</td>
        </tr>
        <tr>
          <td>cover</td>
          <td>卡片封面</td>
        </tr>
        <tr>
          <td>actions</td>
          <td>操作</td>
        </tr>
      </tbody>
    </table>
    <h3 class="mume-header"
        id="uxcardmeta">UxCardMeta</h3>

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
          <td>title</td>
          <td>标题内容</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>desc</td>
          <td>描述</td>
          <td>String</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <h4 class="mume-header"
        id="slots-1">Slots</h4>

    <table class="api-table">
      <thead>
        <tr>
          <th>名称</th>
          <th>描述</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>avatar</td>
          <td>头像</td>
        </tr>
        <tr>
          <td>title</td>
          <td>标题内容</td>
        </tr>
        <tr>
          <td>desc</td>
          <td>描述</td>
        </tr>
      </tbody>
    </table>
    <h3 class="mume-header"
        id="uxcardgrid">UxCardGrid</h3>

    <h4 class="mume-header"
        id="%E6%97%A0-props">无 Props</h4>
  </div>

</template>
