# 0.5.0-next.82 (2020-03-30)

### Bug Fixes

- **cascader:** 修复 value 不显示 bug ([7bba5f2](http://opensource.cnsuning.com/uxcool/lerna-uxcool/commits/7bba5f29cc0e81d643b630d2faf4f0548565e8e8)), closes [#307](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/307)

# 0.5.0-next.81 (2020-03-23)

### Bug Fixes

- **select:** 修复滚动后第一个选项消失问题 ([77869b8](http://opensource.cnsuning.com/uxcool/lerna-uxcool/commits/77869b8c17bdf8857d797a3444ca9d370eb8a878)), closes [#306](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/306)

# 0.5.0-next.80 (2020-03-12)

### Features

- **drawer:** 添加过渡结束事件 ([c32b713](http://opensource.cnsuning.com/uxcool/lerna-uxcool/commits/c32b7136bed2aa3aa912a00e28a0585eb5c72b5b)), closes [#305](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/305)

# 0.5.0-next.79 (2020-02-20)

### Bug Fixes

- **cascader:** 修复 value 重复时节点渲染不正确 bug ([07639e3](http://opensource.cnsuning.com/uxcool/lerna-uxcool/commits/07639e3642a7a13bbf5a6372bb0d712f20caf5d4)), closes [#300](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/300)
- **multi-cascader:** 修复 children 字段可能获取不到 bug ([d625a97](http://opensource.cnsuning.com/uxcool/lerna-uxcool/commits/d625a97d3b96254e9b9a018f435ceb9d816d464f))

# 0.5.0-next.78 (2020-02-17)

### Bug Fixes

- **multi-date-picker:** 修复导出组件名称拼写错误 ([b98989a](http://opensource.cnsuning.com/uxcool/lerna-uxcool/commits/b98989a2d3472582d6982d28c0871e909f758558))

# 0.5.0-next.77 (2020-02-16)

### Features

- **multi-cascader:** 添加级联多选组件 ([7524003](http://opensource.cnsuning.com/uxcool/lerna-uxcool/commits/752400354c2ee6cde748f7e88703a5b23d5a417b))

# 0.5.0-next.76 (2020-02-13)

### Bug Fixes

- **tree-select:** 修复单选模式无法清空 bug ([94cd4c8](http://opensource.cnsuning.com/uxcool/lerna-uxcool/commits/94cd4c87322bb97d3cd401ab801f398f059590da)), closes [#304](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/304)
- **tree-select:** 修复多选模式 placeholder 不显示 bug ([f79ed47](http://opensource.cnsuning.com/uxcool/lerna-uxcool/commits/f79ed47e0589f8a93bf32772089c858aa51bbaac)), closes [#303](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/303)

# 0.5.0-next.75 (2020-01-08)

### Bug Fixes

- **menu:** 修复 menu 菜单嵌套 IE 显示不正常问题 ([1ac1faa](http://opensource.cnsuning.com/uxcool/lerna-uxcool/commits/1ac1faa8d1b45b8a0a21ea91d0f86b8cad82fb76)), closes [#297](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/297)
- **v-trigger:** 修复内嵌 v-trigger 不能响应问题 ([8eba2b1](http://opensource.cnsuning.com/uxcool/lerna-uxcool/commits/8eba2b12d92be15334c652e7d92f50e021aaa6ae))

### Features

- **radio, checkbox:** value 添加 number 类型支持 ([a737c2f](http://opensource.cnsuning.com/uxcool/lerna-uxcool/commits/a737c2fa6e459cfa1583ac89e0bf7376cac4e740)), closes [#299](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/299)

# 0.5.0-next.74 (2019-12-31)

### Bug Fixes

- **Table:** 修复 cellRender 中无法获取内部\$refs 问题 ([f248d9e](http://opensource.cnsuning.com/uxcool/lerna-uxcool/commits/f248d9e518859aae71f140d355e86dfaa1e38852)), closes [#295](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/295)
- **Transfer:** 修复勾选项不正确 bug ([dfe25e1](http://opensource.cnsuning.com/uxcool/lerna-uxcool/commits/dfe25e16f481d46d31585bf9b813ea5c282c574a)), closes [#280](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/280) [#281](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/281) [#292](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/292)

# 0.5.0-next.73 (2019-12-30)

**Note:** Version bump only for package @suning/uxcool

## 0.5.0-next.72 (2019-12-16)

### Bug Fixes

- **Table:** 添加列拖拽调整宽度功能

### Features

- **MonthPicker:** 修复初始 value 不生效问题, closes [#283](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/283)
- **v-trigger:** 修复基于 v-trigger 组件嵌套时点击外层弹窗无法关闭内层弹窗问题, closes [#258](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/258)

## 0.5.0-next.71 (2019-12-06)

### Bug Fixes

- **WeekPicker:** 修复值变化不触发问题
- **DatePicker：** 优化 placeholder

### Features

- **MultiDatePicker:** 新增 MultiDatePicker 组件

  - 新增日期多选组件
  - 不支持时分秒

- **WeekPicker:** 添加 `size` 属性

## 0.5.0-next.70 (2019-12-04)

### Bug Fixes

- **Table:** 修复 data 添加 `children` 字段问题, closes [#275](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/275)
- **Collapse:** 修复 `name=0` 无法通过 `activeKeys` 展开问题, closes [#261](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/261)
- **TreeSelect:** 修复 `change` 事件参数不同步问题, closes [#272](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/272)

### Features

- **Tree:** 添加大数据量支持

## 0.5.0-next.69 (2019-11-27)

### Features

- **WeekPicker:** 新增 WeekPicker 组件

## 0.5.0-next.68 (2019-11-15)

### Bug Fixes

- **Table:** 修复子节点全部拖出父节点后 `getValue` 拿到数据不正确问题, closes [#271](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/271)

## 0.5.0-next.67 (2019-11-15)

### Bug Fixes

- **Table:** 修复未设置 `draggable` 依然可以拖拽问题, closes [#270](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/270)
- **Pagination:** 页面输入框不允许输入非数字, closes [#190](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/190)

## 0.5.0-next.66 (2019-11-12)

### Features

- **Table:** 添加拖拽排序功能, closes [#249](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/249)

## 0.5.0-next.65 (2019-11-11)

### Bug Fixes

- **SliderDatePicker:** 修复 `force-refresh` 切换不生效问题, closes [#269](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/269)

## 0.5.0-next.64 (2019-11-11)

### Bug Fixes

- **SliderDatePicker:** 修复 `allow-clear` 属性无效问题, closes [#266](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/266)

### Features

- **SliderDatePicker:** 添加定时刷新、手动刷新功能, closes [#268](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/268)

## 0.5.0-next.63 (2019-10-28)

### Features

- **DatePicker:** 新增 `YearPicker` 组件

## 0.5.0-next.62 (2019-10-24)

### Features

- **DatePicker:**
  - 新增 `MonthPicker` 组件
  - 新增 `RangeMonthPicker` 组件

## 0.5.0-next.61 (2019-08-27)

### Bug Fixes

- **Table:** 修复表头与表格内容滚动不同步问题, closes [#234](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/234)
- **Tree:** 修复 `showLine=true` 时线条样式问题, closes [#235](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/235)

### Features

- **Tabs:** 添加 `tabBarExtraContent` 插槽, closes [#66](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/66)

## 0.5.0-next.60 (2019-08-17)

### Bug Fixes

- **Tabs:** 修复指定 `value` 后不渲染的问题, closes [#236](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/236)
- **Breadcrumb/Steps:** 修改导出方式

### Features

- **Table:** `title` 属性支持函数，可以自定义表头内容的同时使用内置过滤/筛选, closes [#237](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/237)

## 0.5.0-next.59 (2019-08-13)

### Bug Fixes

- **Tabs:** 修复 slot 内容变化页面不更新问题, closes [#218](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/218)
- **Textarea:** 自定义样式向下兼容, closes [#233](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/233)

## 0.5.0-next.58 (2019-08-06)

### Bug Fixes

- **Tabs:**
- 回滚 Tabs 组件 slot 内容变化页面不更新 bug 代码，重新打开 issue [#218](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/218)
- 修复自定义 slot 出现在 TabPane 中问题, closes [#231](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/231)

### Features

- **Input:** `Input`/`Texarea`/`SearchInput` 组件添加 `blur` 事件，以支持表单自定义验证事件, closes [#230](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/230)
- **Textarea:** 添加 `textareaStyle` 属性

## 0.5.0-next.57 (2019-07-31)

### Features

- **Table:** 添加大数据量支持

## 0.5.0-next.56 (2019-07

### Features

- **Input:** 添加允许清空功能, closes [#174](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/174)
- **SearchInput:** 添加自定义搜索按钮功能, closes [#90](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/90)

## 0.5.0-next.55 (2019-07-15)

### Features

- **Input:** `Input`/`Textarea` 新增输入长度限制样式, closes [#209](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/209)
- **Anchor:** 新增 `before-hash-change` 和 `before-scroll` 属性, closes [#223](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/223)

## 0.5.0-next.54 (2019-07-10)

### Bug Fixes

- **DatePicker:** 修复输入框样式被覆盖的问题

## 0.5.0-next.53 (2019-07-08)

### Bug Fixes

- **TimePicker:** 修复被禁用的时间仍可被选择的问题, closes [#222](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/222)
- **Anchor:** 修复小圆点与文字不对齐的问题, closes [#221](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/221)

### Features

- **Datepicker:** 新增`size`属性, closes [#219](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/219)

## 0.5.0-next.52 (2019-07-03)

### Bug Fixes

- **Tabs:** 修复`tab-pane`标题插槽变化时 view 不变的问题, closes [#218](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/218)
- **Anchor:** 重构 Anchor 组件, closes [#164](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/164)
- **Menu:** 修复`horizontal`模式下不能正确渲染默认选中项样式的问题, closes [#179](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/179)

## 0.5.0-next.51 (2019-06-24)

### Bug Fixes

- **Select:** 修复使用 JSX 语法时 Select 内选项未被正确渲染的问题, closes [#188](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/188)

## 0.5.0-next.50 (2019-06-20)

### Bug Fixes

- **Select:** 修复 JSX 语法中某些情况下`option`标签渲染不出问题
- **DatePicker:** 修复展开面板时清空数据显示 invalid Date 的问题, closes [#198](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/198)

## 0.5.0-next.49 (2019-06-15)

### Bug Fixes

- **Select** 修复 Select 等下拉组件显示空间不足时，下拉框不自动调整位置问题, closes [#213](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/213)

## 0.5.0-next.48 (2019-06-14)

### Bug Fixes

- **Transfer:** 修复`notFoundContent`插槽不起作用的问题, closes [#212](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/212)

## 0.5.0-next.47 (2019-06-12)

### Bug Fixes

- **Table:** 修复 Table 分页大小不能改变的问题, closes [#185](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/185)

## 0.5.0-next.46 (2019-06-06)

### Bug Fixes

- **Tabs:** 修复使用 JSX 语法时 Tabs 标签乱序的问题, closes [#200](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/200)

## 0.5.0-next.45 (2019-05-29)

### Bug Fixes

- **Breadcrumb:** 修改面包屑颜色, closes [#167](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/167)
- **Table:** 修改 Table 样式, closes [#176](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/176)

## 0.5.0-next.44 (2019-04-08)

### Features

- **DatePicker:** `DatePicker`/`DateRangePicker`添加默认事件配置`showTime.defaultValue`, closes [#166](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/166)

## 0.5.0-next.43 (2019-03-27)

### Features

- **Transfer:** 新增添加禁用组件及动态禁用操作按钮功能, closes [#175](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/175)

## 0.5.0-next.42 (2019-03-15)

### Bug Fixes

- **Collapse:** 修复自定义 header 高度超过默认值后图标不垂直居中的问题, closes [#163](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/163)

## 0.5.0-next 41 (2019-02-26)

### Bug Fixes

- **v-trigger:** 修复动态修改 `actions` 不会绑定事件问题

## 0.5.0-next.40 (2019-02-21)

### Features

- **Tree:** 新增节点拖拽判断函数参数

## 0.5.0-next.39 (2019-02-21)

### Features

- **Tree:** 新增异步树重置功能

## 0.5.0-next.38 (2019-02-12)

### Features

- **Icon:** 添加 loading 图标

## 0.5.0-next.37 (2019-02-12)

### Features

- **Icon:** 修改 Icon 字体图标及命名

## 0.5.0-next.36 (2019-02-03)

### Bug Fixes

- **Select:** 修复 `show-arrow` 属性无效的问题, closes [#161](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/161)
- **Input:** 修复 `blur` 方法问题

### Features

- **Transfer:** 新增 `sort` 属性，用于中间按钮排序, closes [#160](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/160)

## 0.5.0-next.35 (2019-01-24)

### Bug Fixes

- **Icon:** 删除有问题的`dingzhi`图标

## 0.5.0-next.33

### Bug Fixes

- **Cascader:** 优化异步加载时，当无子级时不再显示下一层数据及面板

### Features

- **Icon:** 新增图标

## 0.5.0-next.32 (2019-01-18)

### Bug Fixes

- **Tree:** 修复当所有子节点都是`disabled`状态时，父级自动选中的问题, closes [#159](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/159)

## 0.5.0-next.31 (2019-01-17)

### Features

- **Pagination:** 添加分页大小下拉框选择功能, closes [#153](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/153)

## 0.5.0-next.30 (2019-01-15)

### Bug Fixes

- **Select:** 修复切换`dataSource`时找不到选中值 obj 的问题, closes [#156](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/156)

### Features

- **Tree：** 新增拖拽功能, closes [#155](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/155)

## 0.5.0-next.29 (2018-12-28)

### Bug Fixes

- **Dropdown:** 修正 Dropdown 中使用多层 menu 时，交互异常的问题, closes [#152](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/152)

## 0.5.0-next.28 (2018-12-27)

### Bug Fixes

- **Upload:** 修复 before-upload 属性中使用 promise 时有时无法拦截文件上传的问题, closes [#150](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/150)

### Features

- **DatePicker:** 新增 `placement` 属性用于控制下拉框位置, closes [#151](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/151)

## 0.5.0-next.27 (2018-12-26)

### Bug Fixes

- **DateRangePicker:** 修复 DateRangePicker 组件和其他组件上下不对齐问题， closes [#148](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/148)

### Features

- **v-utils:** 新增 TreeHandler 类，辅助实现 checkbox 上下级联关系

## 0.5.0-next.26 (2018-12-24)

### Bug Fixes

- **Table:**
  - 新增`alignRowHeight`方法，用于手动对齐, closes [#146](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/146)
  - 修复 Table 固定列中含有 filter 属性时操作异常的问题， closes [#144](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/144)
- **InputNumber:** 修复输入框清空后输入值异常的问题, 新增 `input-change` 事件， closes [#145](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/145)

## 0.5.0-next.25 (2018-12-18)

### Bug Fixes

- **Form:** 修复 Form 多次动态更新 rules 时无法生效的问题, closes [#141](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/141)
- **Form:** 修复 rules 中的由于顺序问题导致的问题, closes [#139](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/139)
- **VirtualList:** 修复 Vue>=2.5.17 时，VirtualList 的 beforeUpdate 行为变更导致的异常[#138](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/138)

### Features

- **Select:** 新增 `extraTopContent`/ `extraBottomContent` 属性和 slot,支持自定义顶部和底部内容, closes [#142](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/142)

## 0.5.0-next.24 (2018-12-12)

### Bug Fixes

- **SliderDatePicker:** 修改 select 点击事件，每次点击都会触发值修改, closes [#136](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/136)
- **Cascader:** 修复 Cascader 远程数据动态加载时 label 显示不变化的问题, closes [#135](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/135)

## 0.5.0-next.23 (2018-12-11)

### Bug Fixes

- **AutoComplete:** 修复 AutoComplete 第一次无法输入中文的问题, closes [#133](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/133)

### Features

- **Tag:** 新增 `on-before-close` 参数，支持关闭前钩子, closes [#132](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/132)

## 0.5.0-next.22 (2018-12-11)

### Features

- **Drawer:** 新增 Drawer 组件, closes [#134](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/134)

## 0.5.0-next.21 (2018-12-04)

### Bug Fixes

- **Pagination:** 修复按钮样式问题, closes [#131](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/131)
- **TreeSelect:** 修复 TreeSelect 在 Edge 和 IE10 下不展示的问题, closes [#130](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/130)

## 0.5.0-next.20 (2018-11-30)

### Features

- **DatePicker:** 新增 `control-mode` 属性，支持手动控制模式

## 0.5.0-next.19 (2018-11-29)

### Bug Fixes

- **TableSerachForm:** 修复 Input/TimePicker/RangeDatePicker 在 TableSerachForm 组件中不对齐的问题, closes [#129](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/129)
- **Select:** 修复 Select 使用 `datasource` 时，动态修改 `disabled` 属性组件不变化的问题, closes [#128](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/128)
- **Steps:** 修复 `label-placement='vertical'` 时描述文字无法垂直居中问题, closes [#126](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/126)

### Features

-**Select:** 新增鼠标浮动到节点上后显示标题内容, closes [#127](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/127)

## 0.5.0-next.18 (2018-11-28)

### Bug Fixes

- **Modal:** 修复当 Modal 出现或消失时，引起页面宽度变化，导致抖动的问题, closes [#123](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/123)
- **Table:** 修复 Table 底部空白字符占用高度的问题, closes [#121](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/121)

### Features

- **SliderDatePicker:** 新增 `date-picker-events` 参数,传递 RangeDatePicker 组件事件
- **Tooltip:** Popconfirm/Tooltip/Popover 新增 `getPopupContainer` 参数

# 0.5.0-next.17 (2018-11-27)

### Bug Fixes

- **Radio:** 修复 Radio 选中状态圆心为方形问题， closes [#124](http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/124)

### Features

- **SliderDatePicker:** 新增 SliderDatePicker 组件
