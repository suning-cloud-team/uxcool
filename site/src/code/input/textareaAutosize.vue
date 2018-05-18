<template>
  <div>
    <ux-textarea novalidate
                 placeholder="测试用"
                 class="custom-class"
                 style="resize:none"
                 :theme="theme"
                 :auto-size="true">
    </ux-textarea>
    <ux-textarea novalidate
                 placeholder="测试用"
                 class="custom-class"
                 style="resize:none"
                 :theme="theme"
                 :auto-size="{minRows:2, maxRows:6}">
    </ux-textarea>
  </div>
</template>


<script>
  export default {};
</script>
