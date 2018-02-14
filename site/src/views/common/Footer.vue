<template>
  <footer class="ux-layout-footer">
    <div class="links">
      <a href="http://ahd.cnsuning.com/ahd-web/wpm/index.html#/index"
         target="_blank">工作计划管理平台</a>
      <a href="http://ued.cnsuning.com/meetingroom"
         target="_blank">会议室预定</a>
      <a href="http://eitp.cnsuning.com/itp-web-in/processStartDraft.do?businessTemplateId=NSOA0339"
         target="_blank">ITP日志</a>

    </div>
    <div class="copyright ux-sm-hidden-down">copyright@2017 - {{year}} UXCOOL</div>
  </footer>
</template>

<style lang="scss">
  .links {
    float: left;
    margin: 10px;

    a {
      margin: 0 20px;
    }
  }

  .copyright {
    float: right;
    padding: 10px;
    color: #666;
  }
</style>

<script>
  export default {
    data() {
      return {
        year: new Date().getFullYear(),
      };
    },
  };
</script>

