<template lang="pug">

span(@click="onbutton").wrap-button.px10.py6 {{label}}

</template>

<style lang="scss" scoped>
.wrap-button {
  display: inline-block;
  text-align: center;
  color: #fff;
  letter-spacing: 0.6px;
  background: #2a2a2a;
  border-radius: 3px;
  cursor: pointer;
}
</style>

<script>

export default {
  props: {
    label: {
      type: String,
      required: true
    }
  },
  methods: {
    onbutton () {
      this.$emit('onbutton')
    }
  }
}
</script>
