<template>
  <div ref="wrapRef"
       class="demo">
    <h4> modal </h4>
    <ux-button @click="onModalClick">open modal</ux-button>
    <ux-modal v-model="modalVisible">
      <ux-button @click="onClick">open drawer</ux-button>
      <ux-select style="width:100%">
        <ux-option-group id="1"
                         label="abc">
          <ux-option value="A">A1</ux-option>
          <!-- <ux-option value="A"
                   label="A1" /> -->
          <ux-option value="B"
                     label="B2" />
        </ux-option-group>

        <ux-option id="2"
                   c="1"
                   value="C"
                   label="C3">333</ux-option>
      </ux-select>
    </ux-modal>

    <ux-drawer v-model="visible"
               :get-container="container"
               z-index="1040">
      <div ref="drawRef"
           style="height:1000px;position:relative">{{ content }}
        <ux-select :get-container="getDrawerContainer"
                   style="width:100%">
          <ux-option-group id="1"
                           label="abc">
            <ux-option value="A">A1</ux-option>
            <!-- <ux-option value="A"
                   label="A1" /> -->
            <ux-option value="B"
                       label="B2" />
          </ux-option-group>

          <ux-option id="2"
                     c="1"
                     value="C"
                     label="C3">333</ux-option>
        </ux-select>
      </div>
    </ux-drawer>
  </div>

</template>

<script>
  import { Drawer, Button, Modal, Select } from '@suning/uxcool';

  export default {
    components: {
      UxDrawer: Drawer,
      UxButton: Button,
      UxModal: Modal,
      UxSelect: Select,
      UxOption: Select.Option,
      UxOptionGroup: Select.Group,
    },
    data() {
      return {
        container: null,
        content: 'hello content',
        visible: false,
        modalVisible: false,
      };
    },
    created() {
      setTimeout(() => {
        // this.container = this.getContainer;
        this.content = 'this is drawer content ';
      }, 1500);
    },
    methods: {
      getContainer() {
        return this.$refs.wrapRef;
      },
      getDrawerContainer() {
        return this.$refs.drawRef;
      },
      onClick() {
        const { visible } = this;
        this.visible = !visible;
      },
      onModalClick() {
        this.modalVisible = !this.modalVisible;
      },
    },
  };
</script>
