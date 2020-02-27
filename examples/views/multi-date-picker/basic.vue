<template>
  <div>
    <h1>Multi Date Picker</h1>
    <allow-clear-demo />
    <container-demo />
    <disabled-date-demo />
    <disabled-demo />
    <events-demo />
    <format-demo />
    <locale-demo />
    <picker-value-demo />
    <placeholder-demo />
    <placement-demo />
    <size-demo />
    <value-demo />
    <visible-demo />
    <show-date-input-demo />
  </div>
</template>

<script>
  import AllowClearDemo from './allow-clear.vue';
  import ContainerDemo from './container.vue';
  import DisabledDateDemo from './disabled-date.vue';
  import DisabledDemo from './disabled.vue';
  import EventsDemo from './events.vue';
  import FormatDemo from './format.vue';
  import LocaleDemo from './locale.vue';
  import PickerValueDemo from './picker-value.vue';
  import PlaceholderDemo from './placeholder.vue';
  import PlacementDemo from './placement.vue';
  import SizeDemo from './size.vue';
  import ValueDemo from './value.vue';
  import VisibleDemo from './visible.vue';
  import ShowDateInputDemo from './show-date-input.vue';

  export default {
    components: {
      AllowClearDemo,
      ContainerDemo,
      DisabledDateDemo,
      DisabledDemo,
      EventsDemo,
      FormatDemo,
      LocaleDemo,
      PickerValueDemo,
      PlaceholderDemo,
      PlacementDemo,
      SizeDemo,
      ValueDemo,
      VisibleDemo,
      ShowDateInputDemo,
    },
  };
</script>
