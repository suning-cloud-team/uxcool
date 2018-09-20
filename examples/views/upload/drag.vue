<template>
  <div class="demo">
    <h4>drag</h4>
    <ux-upload type="drag"
               directory
               list-type="picture-card"
               action="/upload">
      <ux-icon class="drag-upload-icon"
               type="upload" />
      <div>
        Drag to Here
      </div>
    </ux-upload>
    <br>
    <ux-upload type="drag"
               list-type="picture-card"
               action="/upload">
      <ux-icon class="drag-upload-icon"
               type="upload" />
      <div>
        Drag to Here
      </div>
    </ux-upload>
  </div>
</template>

<script>
  import { Upload, Button, Icon } from '@suning/uxcool';

  function addEventListener(element, eventName, fn, useCapture = false) {
    element.addEventListener(eventName, fn, useCapture);
    return {
      remove() {
        element.removeEventListener(eventName, fn, useCapture);
      },
    };
  }
  export default {
    components: {
      UxUpload: Upload,
      UxButton: Button,
      UxIcon: Icon,
    },
    data() {
      return {
        globalDragEvents: null,
        preventGlobalDrag: false,
      };
    },
    created() {
      this.preventGlobalDragEvent();
    },
    beforeDestroy() {
      this.removePreventDragEvent();
    },
    methods: {
      removePreventDragEvent() {
        const { globalDragEvents } = this;
        if (Array.isArray(globalDragEvents) && globalDragEvents.length > 0) {
          globalDragEvents.forEach(event => event.remove());
        }
      },
      preventGlobalDragEvent() {
        const { removePreventDragEvent } = this;
        removePreventDragEvent();
        this.globalDragEvents = ['dragover', 'drop'].map(name =>
          addEventListener(document, name, (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'none';
        }));
      },
    },
  };
</script>

<style scope lang="scss">
  .drag-upload-icon {
    font-size: 56px;
    color: #88d88f;
  }
</style>
