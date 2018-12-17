<template>
  <div class="app-footer">
    <div class="footer-links">
      <a href="http://dippre.cnsuning.com"
         target="_blank">DIP • 数据接口平台</a>
      <a href="http://mmlos.cnsuning.com/mlos-web/roomReservation/imeetingBook.htm"
         target="_blank">会议室预定</a>
      <a href="http://eitp.cnsuning.com/itp-web-in/processStartDraft.do?businessTemplateId=NSOA0339"
         target="_blank">ITP日志</a>
      <a href="http://wiki.cnsuning.com/pages/viewpage.action?pageId=27994287"
         target="_blank">水印组件</a>
    </div>
    <div class="copyright ux-sm-hidden-down">Copyright &copy; 2017 - {{ year }} UXCOOL</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        year: new Date().getFullYear(),
      };
    },
  };
</script>

<style lang="scss">
  .app-footer {
    background: #fff;
    overflow: hidden;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
  }
</style>


