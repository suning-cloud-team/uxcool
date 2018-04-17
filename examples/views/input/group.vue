<template>
  <div>
    <h4>Col</h4>
    <div class="demo">
      <ux-input-group>
        <ux-col :span="4">
          <ux-input />
        </ux-col>
        <ux-col :span="5">
          <ux-input/>
        </ux-col>
      </ux-input-group>
    </div>

    <h4>input compact</h4>
    <div class="demo">
      <ux-input-group compact>
        <ux-input value="123"
                  style="width:10%;" />
        <ux-input value="456"
                  style="width:20%;" />
      </ux-input-group>
    </div>

    <h4>select, input compact</h4>
    <div class="demo">
      <ux-input-group compact>
        <ux-select value="http://">
          <ux-option value="http://">http://</ux-option>
          <ux-option value="https://">https://</ux-option>
          <ux-option value="ftp://">ftp://</ux-option>
        </ux-select>
        <ux-input style="width:20%" />
      </ux-input-group>
    </div>

    <div class="demo">
      <ux-input-group compact>
        <ux-input style="width:20%" />
        <ux-select value="http://">
          <ux-option value="http://">http://</ux-option>
          <ux-option value="https://">https://</ux-option>
          <ux-option value="ftp://">ftp://</ux-option>
        </ux-select>
      </ux-input-group>
    </div>

    <h4>datepicker, input compact</h4>
    <div class="demo">
      <ux-input-group compact>
        <ux-input style="width:20%" />
        <ux-date-picker />
      </ux-input-group>

    </div>
    <div class="demo">
      <ux-input-group compact>
        <ux-date-picker />
        <ux-input style="width:20%" />
      </ux-input-group>

    </div>
    <div class="demo">
      <ux-input-group compact>
        <ux-date-picker />
        <ux-range-date-picker />
      </ux-input-group>

    </div>
    <div class="demo">
      <ux-input-group compact>
        <ux-range-date-picker />
        <ux-date-picker />
      </ux-input-group>

    </div>

    <h4>select ,select compact</h4>
    <div class="demo">
      <ux-input-group compact>
        <ux-select value="http://">
          <ux-option value="http://">http://</ux-option>
          <ux-option value="https://">https://</ux-option>
          <ux-option value="ftp://">ftp://</ux-option>
        </ux-select>
        <ux-select value=".edu">
          <ux-option value=".com">.com</ux-option>
          <ux-option value=".org.org.org.org.org.org">.org.org.org.org.org.org</ux-option>
          <ux-option value=".edu">.edu</ux-option>
          <ux-option value=".cn">.cn</ux-option>
        </ux-select>
      </ux-input-group>
    </div>

    <h4>select, input compact</h4>
    <div class="demo">

      <ux-input-group compact>
        <ux-select value="http://">
          <ux-option value="http://">http://</ux-option>
          <ux-option value="https://">https://</ux-option>
          <ux-option value="ftp://">ftp://</ux-option>
        </ux-select>
        <ux-input style="width:100px"
                  placeholder="Min" />
        <ux-input style="width:30px;border-left:none;background:#fff"
                  placeholder="~"
                  disabled />
        <ux-input style="width:100px;border-left:none; "
                  placeholder="Max" />
      </ux-input-group>
    </div>
  </div>
</template>


<script>
  import { Input, Grid as Row, Select, Datepicker } from '@suning/uxcool';

  export default {
    components: {
      UxInputGroup: Input.Group,
      UxInput: Input,
      UxCol: Row.Col,
      UxSelect: Select,
      UxOption: Select.Option,
      UxDatePicker: Datepicker,
      UxRangeDatePicker: Datepicker.Range,
    },
  };
</script>
