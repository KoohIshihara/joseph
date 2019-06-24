<template lang="pug">

div.wrap-home
  ModuleFooter

</template>

<style lang="scss" scoped>
.wrap-page {
  overflow: scroll;
  display: block;
  width: 100%;
  /*height: calc(100vh - 48px);*/
  height: 100vh;
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
}
</style>

<script>
import ModuleFooter from '@/components/modules/ModuleFooter'

export default {
  components: {
    ModuleFooter
  }
}
</script>
