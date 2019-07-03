<template lang="pug">

Auth(@loggedIn="loggedIn" @loginFailed="loginFailed").wrap-home
  div.wrap-page
    Header(:headerContent="headerContent" @onRight="onRight")
    ModuleHome
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
import ModuleHome from '@/components/modules/Home'

import { createNamespacedHelpers } from 'vuex'
const { mapState: authState, mapActions: mapActionsAuth } = createNamespacedHelpers('auth')

export default {
  components: {
    Auth,
    Header,
    Footer,
    ModuleHome
  },
  data () {
    return {
      headerContent: Object
    }
  },
  created () {
    this.headerContent = {
      left: {},
      right: { label: '' },
      center: { label: 'Timeline' }
    }
  },
  methods: {
    ...mapActionsAuth(['signOut']),
    async loggedIn () {
      console.log('authed')
    },
    async loginFailed () {
      console.log('unauthed')
    },
    onRight () {
      console.log('sign out')
      this.signOut()
      this.$router.push('/')
    }
  }
}
</script>
