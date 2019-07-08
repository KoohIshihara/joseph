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
const { mapState: mapStateAuth, mapActions: mapActionsAuth } = createNamespacedHelpers('auth')

export default {
  components: {
    Auth,
    Header,
    Footer,
    ModuleHome
  },
  computed: {
    ...mapStateAuth(['isLoggedIn', 'uid', 'isAnonymous'])
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

    if (this.isAnonymous || !this.uid) this.headerContent.right = { label: 'Sign Up' }

    window.signOut = this.signOut
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
      if (this.isAnonymous || !this.uid) {
        this.$router.push('/sign-up')
        mixpanel.track('Home: onRight (sign up) (Anonymous)')
      } else {
        this.signOut()
        this.$router.push('/')
        mixpanel.track('Home: onRight (sign out)')
      }
    }
  }
}
</script>
