<template>
  <ux-demo :height="200"
           title="位置">
    <div slot="demo">
      <ux-dropdown placement="topLeft">
        <ux-button slot="trigger">
          topLeft
        </ux-button>
        <ux-menu slot="overlay"
                 multiple>
          <ux-menu-item v-for="(v,i) in menus"
                        :key="i"
                        :name="v.name">
            {{ v.label }}
          </ux-menu-item>
        </ux-menu>
      </ux-dropdown>
      <ux-dropdown placement="topCenter">
        <ux-button slot="trigger">
          topCenter
        </ux-button>
        <ux-menu slot="overlay"
                 multiple>
          <ux-menu-item v-for="(v,i) in menus"
                        :key="i"
                        :name="v.name">
            {{ v.label }}
          </ux-menu-item>
        </ux-menu>
      </ux-dropdown>
      <ux-dropdown placement="topRight">
        <ux-button slot="trigger">
          topRight
        </ux-button>
        <ux-menu slot="overlay"
                 multiple>
          <ux-menu-item v-for="(v,i) in menus"
                        :key="i"
                        :name="v.name">
            {{ v.label }}
          </ux-menu-item>
        </ux-menu>
      </ux-dropdown>
      <ux-dropdown placement="bottomLeft">
        <ux-button slot="trigger">
          bottomLeft
        </ux-button>
        <ux-menu slot="overlay"
                 multiple>
          <ux-menu-item v-for="(v,i) in menus"
                        :key="i"
                        :name="v.name">
            {{ v.label }}
          </ux-menu-item>
        </ux-menu>
      </ux-dropdown>
      <ux-dropdown placement="bottomCenter">
        <ux-button slot="trigger">
          bottomCenter
        </ux-button>
        <ux-menu slot="overlay"
                 multiple>
          <ux-menu-item v-for="(v,i) in menus"
                        :key="i"
                        :name="v.name">
            {{ v.label }}
          </ux-menu-item>
        </ux-menu>
      </ux-dropdown>
      <ux-dropdown placement="bottomRight">
        <ux-button slot="trigger">
          bottomRight
        </ux-button>
        <ux-menu slot="overlay"
                 multiple>
          <ux-menu-item v-for="(v,i) in menus"
                        :key="i"
                        :name="v.name">
            {{ v.label }}
          </ux-menu-item>
        </ux-menu>
      </ux-dropdown>
    </div>
    <div slot="desc">
      显示位置,支持
      <code>bottomLeft</code>,
      <code>bottomCenter</code>,
      <code>bottomRight</code>,
      <code>topLeft</code>,
      <code>topCenter</code>,
      <code>topRight</code>
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/dropdown/position.vue';

  function mock(cnt = 10) {
    return Array(cnt)
      .fill(0)
      .map((_, i) => ({ name: `sub-menu-item-${i}`, label: `测试${i}-${i}-测试${i}-${i}` }));
  }
  export default {
    data() {
      return {
        code,
        menus: mock(5),
        visible: false,
      };
    },
    methods: {
      getContainer() {
        return this.$refs.containerRef;
      },
    },
  };
</script>

<style scoped>
  .demo .ux-btn {
    margin-left: 10px;
  }
</style>
