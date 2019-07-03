<template lang="pug">

div.wrap-module
  div.wrap-module-content.f.fm.flex-around
    div(v-for="item in menu" @click="item.func()" :data-to="item.data").wrap-icon
      div.f.fc
        v-icon {{item.icon}}
      span {{item.label}}

</template>

<style lang="scss" scoped>
.wrap-module {
  /*position: absolute;*/
  bottom: 0;
  width: 100%;
  height: 48px;
  border-top: solid 0.6px rgba(0, 0, 0, 0.2);
  background: #f8f8f8;
  .wrap-module-content {
    max-width: 480px;
    height: 100%;
    margin: 0 auto;
    .wrap-icon {
      cursor: pointer;
      i {
        transform: translateY(4px);
      }
      span {
        text-align: center;
        font-size: 10px;
        letter-spacing: 0.4px;
      }
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
      { icon: 'group_add', label: 'New Group', func: this.createNewGroup, data: 'new_group' }
      // { icon: 'person', label: 'My Page', data: 'my_page' }
    ]
  },
  methods: {
    createNewGroup () {
      console.log('create new group')
      this.$router.push('create_group')
    }
  }
}
</script>
