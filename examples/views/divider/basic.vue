<template>
  <div>
    <div class="demo">
      <h6>horizontal</h6>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.</p>
      <divider/>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.</p>
      <divider>With Text</divider>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.</p>
      <divider dashed />
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.</p>
    </div>
    <div class="demo">
      <h6>vertical</h6>
      Text
      <divider type="vertical" />
      <a href="#">link</a>
      <divider type="vertical" />
      <a href="#">link</a>
    </div>
  </div>
</template>
<script>
  import '@suning/uxcool/src/components/divider/style/index.scss';
  import Divider from '@suning/uxcool/src/components/divider';

  export default {
    components: {
      Divider,
    },
  };
</script>
