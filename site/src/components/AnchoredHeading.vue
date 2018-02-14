<script>
export default {
  props: {
    level: {
      type: [Number, String],
      required: true,
    },
    id: String,
    noanchor: Boolean,
  },
  render(h) {
    const vnodes = [this.$slots.default];

    if (this.$slots.subtitle) {
      vnodes.push(
        h(
          'span',
          {
            class: 'subtitle',
          },
          this.$slots.subtitle
        )
      );
    }

    if (!this.noanchor) {
      vnodes.push(h('a', { attrs: { href: `#${this.id}` } }, '#'));
    }

    return h(`h${this.level}`, { class: 'ux-heading', attrs: { id: this.id } }, vnodes);
  },
};
</script>
