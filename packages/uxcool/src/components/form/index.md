## API

> <b>重要:</b> 当输入控件未使用`UxFieldDecorator`包裹时,`UxForm`会忽略此控件

### UxForm

#### Props

| 参数名             | 描述                                         | 类型    | 默认       |
| ------------------ | -------------------------------------------- | ------- | ---------- |
| layout             | 布局,可选值:`horizontal`,`vertical`,`inline` | String  | horizontal |
| hide-required-mark | 隐藏表单必选标志                             | Boolean | false      |
| locale             | 验证文案显示语言,支持`zh_CN`, `en`           | String  | zh_CN      |
| validator          | 验证设置, 详见下方文档                       | Object  |            |
| messages           | 自定义验证文案                               | Object  |            |

#### Events

| 事件名     | 描述                              | 回调        |
| ---------- | --------------------------------- | ----------- |
| submit     | 表单`Submit`事件                  | Function(e) |
| form-flags | `form`表单的 flags state,详见下表 | Function()  |

### UxFormItem

#### Props

| 参数名     | 描述                                          | 类型    | 默认                                                                |
| ---------- | --------------------------------------------- | ------- | ------------------------------------------------------------------- |
| label      | label 标签文本                                | String  |                                                                     |
| labelCol   | label 标签布局,同`Col`组件                    | Object  | 当`layout=horizontal`时,默认为`{ xs: 24, sm: 8, }`,其他情况为 null  |
| wrapperCol | 输入控件布局样式 ,用法`labelCol`相同          | Object  | 当`layout=horizontal`时,默认为`{ xs: 24, sm: 16, }`,其他情况为 null |
| required   | 是否必填, 如不设置,会根据校验规则自动生成     | Boolean |                                                                     |
| colon      | 是否显示 `label` 后的冒号,配合`label`属性使用 | Boolean | false                                                               |

#### Slots

| 名称  | 描述              |
| ----- | ----------------- |
| label | 自定义 label 内容 |

### UxFieldDecorator

#### Props

| 参数名      | 描述                                          | 类型                  | 默认  |
| ----------- | --------------------------------------------- | --------------------- | ----- |
| name        | 输入控件唯一性标示(`required`)                | String                |       |
| rules       | `vee-validate`校验规则                        | String\|Object\|Array |       |
| validator   | 验证设置, 详见下方文档                        | Object                |       |
| hasFeedback | `UxInput`组件展示状态图标,                    | Boolean               | false |
| alias       | 校验显示的字段名称, 默认为`FormItem`的`label` | String                |       |

### UxForm Flags

| 属性名    | 描述                 |
| --------- | -------------------- |
| pristine  | 是否未手动操作       |
| dirty     | 是否已手动操作       |
| valid     | 是否有效             |
| invalid   | 是否无效             |
| validated | 是否至少被验证了一次 |
| pending   | 是否验证过程中       |
| changed   | 值是否已被改变       |

### UxForm Static Methods

| 方法名          | 描述                                                                   | 类型                                                                      |
| --------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| extendValidator | 自定验证规则, 由于底层`vee-validator`的限制,**自定义的规则都是全局的** | Function(ruleName, Validator, options={hasTarget:false, locale: 'zh_CN'}) |

使用可参考,例子中的 自定义规则示例 以及[更详细的内容](https://baianat.github.io/vee-validate/guide/custom-rules.html)

### UxForm Methods

| 方法名         | 描述                                                                              | 类型                                                                |
| -------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| validate       | 校验输入组件的值, 如未传递`FieldDecorator.name`,则验证所有组件,并返回一个 promise | Function([fieldName:String])=>Promise<valid:Boolean, values:Object> |
| resetFields    | 重置表单, 将所有字段置为初始值,并清除校验结果                                     | Function()                                                          |
| clearErrors    | 清除校验结果                                                                      | Function()                                                          |
| getFieldError  | 获取某个输入组件 Error                                                            | Function(fieldName)                                                 |
| getFieldsError | 获取一组输入组件 Error, 如果未传递参数,则获取所有 Error                           | Function([fieldNames:String[]])                                     |

### Validator options

| 参数名       | 描述                                           | 类型    | 默认         |
| ------------ | ---------------------------------------------- | ------- | ------------ |
| initial      | 是否初始化时校验                               | Boolean | false        |
| events       | 触发校验时机                                   | String  | `input|blur` |
| disable      | 是否禁止触发 `events` 指定事件                 | Boolean | false        |
| delay        | 延迟触发`events`指定事件                       | Number  | 0            |
| rejectsFalse | 当值为`false`时,`required`规则是否判定为`fail` | Boolean | false        |

### 校验规则

| 参数名       | 描述                                                                                                                                               | 类型                | 默认                               |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ---------------------------------- |
| required     | 是否必选                                                                                                                                           | required:Boolean    | required:true                      |
| in           | 枚举                                                                                                                                               | in:list             | 'in:1,2,3,4'或{in:[1,2,3,4]}       |
| not_in       | 否定 枚举                                                                                                                                          | not_in:list         | 'not_in:1,2,3,4'{not_in:[1,2,3,4]} |
| digits       | 定长                                                                                                                                               | digits:length       |                                    |
| max          | 最大限长                                                                                                                                           | max:length          |                                    |
| min          | 最小限长                                                                                                                                           | min:length          |                                    |
| max_value    | 最大值                                                                                                                                             | max_value:value     |                                    |
| min_value    | 最小值                                                                                                                                             | min_value:value     |                                    |
| email        | 邮件                                                                                                                                               | email               |                                    |
| regex        | 正则,字符串格式,不能使用 `|` 和`,`,建议正则只使用 `Object` 格式                                                                                    | regex:pattern,flags | {regex: /^\d+$/g}                  |
| between      | 值域范围                                                                                                                                           | between:min,max     |
| confirmed    | 校验值是否与 confirmed 的 target 的值相同, 一般用于密码确认                                                                                        | confirmed:target    | {confirmed:password}               |
| alpha        | 只能包含[alphabetic characters](https://github.com/baianat/vee-validate/blob/master/src/rules/alpha_helper.js#L6)                                  | alpha:locale        | 'alpha'或'alpha:en'                |
| alpha_num    | 可以包括[alphabetic characters, numbers](https://github.com/baianat/vee-validate/blob/master/src/rules/alpha_helper.js#L46)                        | alpha_num:locale    | 'alpha_num'或'alpha_num:en'        |
| alpha_spaces | 可以包括[alphabetic characters or spaces](https://github.com/baianat/vee-validate/blob/master/src/rules/alpha_helper.js#L26)                       | alpha_spaces:locale | 'alpha_spaces'或'alpha_spaces:en'  |
| alpha_dash   | 可以包括[alphabetic characters, numbers, dashes or underscores](https://github.com/baianat/vee-validate/blob/master/src/rules/alpha_helper.js#L66) | alpha_dash:locale   | 'alpha_dash'或'alpha_dash:en'      |

更多规则详见: [vee-validate](https://baianat.github.io/vee-validate/guide/rules.html)

### 校验提示文案

1.  `Form` 校验包含默认[提示文案](https://github.com/baianat/vee-validate/blob/master/locale/zh_CN.js)

2.  可使用 `Form` 的`messages`属性定义提示文案

```javascript
{
  email: (field) => ` ${field} 必须是有效的邮箱.`,
  in: (field) => ` ${field} 必须是一个有效值.`,
  digits: (field, [length]) => ` ${field} 必须是数字，且精确到 ${length}数`,
  required: '请输入值`,
}
```

3.  单个组件单独定义文案

> 支持`String`, `Object`, `Array`格式

```html
//String
<ux-field-decorator name="field" rules="required|in:1,2,3,4">
  <ux-input v-model="item.value" />
</ux-field-decorator>

// Object
<ux-field-decorator name="field" :rules="{required:true, message:'请输入值'}">
  <ux-input v-model="item.value" />
</ux-field-decorator>

<ux-field-decorator name="field" :rules="{required:true, email:true}">
  <ux-input v-model="item.value" />
</ux-field-decorator>

// Array
<ux-field-decorator name="field" :rules="[{required:true, message:'请输入值'},{max:10,message: '最大长度'}]">
  <ux-input v-model="item.value" />
</ux-field-decorator>
```
