<template>
  <ux-demo title="文本域">
    <div slot="demo">
      <div>
        <ux-textarea id="textarea1"
                     row="4" />
        <ux-textarea id="textarea2"
                     row="4"
                     style="height: 100px; margin-top: 10px; resize: none;" />
        <ux-textarea id="textarea3"
                     :textarea-style="{height: '100px', marginTop: '10px', resize: 'none'}"
                     row="4" />
      </div>
    </div>
    <div slot="desc">多行输入。可以通过<code>textareaStyle</code>指定文本域样式。
      <blockquote>
        <p><code>0.5.0-next.56</code>版本引入<code>showWordLimit</code>属性，导致组件DOM结构发生破坏性变更，直接在组件上给文本域设置样式会不生效。<code>0.5.0-next.58</code>添加<code>textareaStyle</code>属性，用来设置文本域样式。 </p>
        <p>
          <code>0.5.0-next.59</code>版本做了向下兼容，在不使用 <code>showWordLimit</code> 功能时，会回退到旧版本模式，即可以直接在组件上通过<code>style</code> 属性设置文本域样式，但更推荐使用<code>textareaStyle</code> 去设置。
        </p>
      </blockquote>
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>


<script>
  import code from '@/code/input/textarea.vue';

  export default {
    data() {
      return {
        code,
      };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
  };
</script>
