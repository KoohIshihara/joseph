<template lang="pug">

Auth(@loggedIn="loggedIn" @loginFailed="loginFailed").wrap-home
  div.wrap-page
    Header(:headerContent="headerContent")
    Footer

</template>

<style lang="scss" scoped>
.wrap-page {
}
</style>

<script>
import Auth from '@/components/auth'
import Header from '@/components/modules/Header'
import Footer from '@/components/modules/Footer'

export default {
  components: {
    Auth,
    Header,
    Footer
  },
  data () {
    return {
      headerContent: Object
    }
  },
  created () {
    this.headerContent = {
      left: {},
      right: {},
      center: { label: 'Timeline' }
    }
  },
  methods: {
    async loggedIn () {
      console.log('authed')
    },
    async loginFailed () {
      console.log('unauthed')
    }
  }
}
</script>
