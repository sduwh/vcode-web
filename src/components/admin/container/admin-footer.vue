<template>
  <div class="footer" id="footer">
    <VFooter :footerInfo="footerInfo"></VFooter>
  </div>
</template>

<script>
import VFooter from "components/footer/v-footer";
export default {
  data() {
    return {
      footerInfo: {
        title: "Virtual Code",
        copyright: "Sduwh Start Code Team",
        version: "1.0",
        github: "https://github.com/sduwh",
        wechat: "",
        weibo: ""
      }
    };
  },
  components: {
    VFooter
  }
};
</script>

<style scoped></style>
