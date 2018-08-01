<template>
  <footer class="ux-layout-footer"
          style="left: 230px;">
    <div class="footer-links">
      <a href="http://dippre.cnsuning.com"
         target="_blank">DIP • 数据接口平台</a>
      <a href="http://mmlos.cnsuning.com/mlos-web/roomReservation/imeetingBook.htm"
         target="_blank">会议室预定</a>
      <a href="http://eitp.cnsuning.com/itp-web-in/processStartDraft.do?businessTemplateId=NSOA0339"
         target="_blank">ITP日志</a>
      <a href="/web/index.html#/dashboard"
         target="_blank">模板预览 </a>
    </div>
    <div class="copyright ux-sm-hidden-down">Copyright &copy; 2017 - {{ year }} UXCOOL</div>
  </footer>
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

