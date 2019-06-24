<template lang="pug">

div.wrap-module.f.fm.flex-around
  div(v-for="item in menu" :data-to="item.data").wrap-icon
    div.f.fc
      v-icon {{item.icon}}
    span {{item.label}}

</template>

<style lang="scss" scoped>
.wrap-module {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 48px;
  border-top: solid 0.6px rgba(0, 0, 0, 0.2);
  background: #f8f8f8;
  .wrap-icon {
    cursor: pointer;
    i {
      transform: scale(1.2) translateY(4px);
    }
    span {
      text-align: center;
      font-size: 10px;
      letter-spacing: 0.4px;
    }
  }
}
</style>

<script>

export default {
  data () {
    return {
      menu: Array
    }
  },
  created () {
    this.menu = [
      { icon: 'home', label: 'Timeline', data: 'home' },
      { icon: 'group_add', label: 'New Group', data: 'new_group' },
      { icon: 'person', label: 'My Page', data: 'my_page' }
    ]
  }
}
</script>
