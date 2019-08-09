<template>
  <div>
    <ux-textarea :textarea-style="{resize:'none'}"
                 :auto-size="true"
                 novalidate
                 placeholder="测试用"
                 class="my-xs-2">
    </ux-textarea>
    <ux-textarea :auto-size="{minRows:2, maxRows:6}"
                 :textarea-style="{resize:'none'}"
                 novalidate
                 placeholder="测试用"
                 class="my-xs-2">
    </ux-textarea>
  </div>
</template>


<script>
  export default {};
</script>
