<template>
  <div>
    <ux-row :gutter="10">
      <ux-col :span="6">
        <ux-box title="title"
                icon="order_date">
          content
        </ux-box>
      </ux-col>
      <ux-col :span="6">
        <ux-box title="title">
          <template slot="icon">
            <ux-icon type="order_date"
                     class="ux-box-icon" />
          </template>
          content
        </ux-box>
      </ux-col>
      <ux-col :span="6">
        <ux-box icon="order_date">
          <template slot="title">title 2</template>
          content
        </ux-box>
      </ux-col>
      <ux-col :span="6">
        <ux-box>
          <template slot="icon">
            <ux-icon type="order_date"
                     class="ux-box-icon" />
          </template>
          <template slot="title">title</template>
          content
        </ux-box>
      </ux-col>
      <ux-col :span="6">
        <ux-box title="title"
                icon="bells">
          <template slot="actions">
            <a href="#">更多</a>
          </template>
          content
        </ux-box>
      </ux-col>
      <ux-col :span="6">
        <ux-box title="title"
                icon="bells"
                bordered>
          <template slot="actions">
            <a href="#">更多</a>
          </template>
          content
        </ux-box>
      </ux-col>
      <ux-col :span="6">
        <ux-box title="title"
                icon="bells"
                flex>
          <template slot="actions">
            <a href="#">更多</a>
          </template>
          content
        </ux-box>
      </ux-col>
      <ux-col :span="6">
        <ux-box title="title"
                icon="bells"
                color="#0081ff">
          <template slot="actions">
            <a href="#">更多</a>
          </template>
          content
        </ux-box>
      </ux-col>
      <ux-col :span="6">
        <ux-box title="title"
                icon="bells"
                color="red">
          <template slot="actions">
            <a href="#">更多</a>
          </template>
          content
        </ux-box>
      </ux-col>
      <ux-col :span="6">
        <ux-box title="title"
                icon="bells"
                color="yellow">
          <template slot="actions">
            <a href="#">更多</a>
          </template>
          content
        </ux-box>
      </ux-col>
      <ux-col :span="6">
        <ux-box title="title"
                icon="bells"
                color="cyan">
          <template slot="actions">
            <a href="#">更多</a>
          </template>
          content
        </ux-box>
      </ux-col>
      <ux-col :span="6">
        <ux-box title="title"
                icon="bells"
                color="blue">
          <template slot="actions">
            <a href="#">更多</a>
          </template>
          content
        </ux-box>
      </ux-col>
    </ux-row>
  </div>
</template>

<script>
  import { UxRow, UxCol } from '@cloud-sn/uxcool/src/components/grid';
  import { UxBox, UxIcon } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxBox,
      UxRow,
      UxCol,
      UxIcon,
    },
  };
</script>

