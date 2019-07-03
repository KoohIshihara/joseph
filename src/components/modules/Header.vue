<template lang="pug">

div.wrap-module
  div.wrap-module-content.f.fm.flex-between
    div.wrap-left
      div(v-if="headerContent.left" @click="onLeft").left
        v-icon(v-if="headerContent.left.icon") {{headerContent.left.icon}}
        span(v-if="headerContent.left.label").label {{headerContent.left.label}}
    div(v-if="headerContent.center").wrap-center
      span {{headerContent.center.label}}
    div.wrap-right
      div(v-if="headerContent.right" @click="onRight").right
        v-icon(v-if="headerContent.right.icon") {{headerContent.right.icon}}
        span(v-if="headerContent.right.label").label {{headerContent.right.label}}

</template>

<style lang="scss" scoped>
.wrap-module {
  position: absolute;
  z-index: 100;
  top: 0;
  width: 100%;
  height: 48px;
  border-bottom: solid 0.6px rgba(0, 0, 0, 0.2);
  background: #f8f8f8;
  .wrap-module-content {
    width: 90%;
    max-width: 480px;
    height: 100%;
    margin: 0 auto;
    i {
      font-size: 20px;
      cursor: pointer;
    }
    .label {
      color: #03a9f4;
      cursor: pointer;
    }
  }
}
</style>

<script>

export default {
  props: {
    headerContent: {
      type: Object,
      required: true
    }
  },
  created () {

  },
  methods: {
    onLeft () {
      this.$emit('onLeft')
    },
    onRight () {
      this.$emit('onRight')
    }
  }
}
</script>
