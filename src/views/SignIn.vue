<template>
  <Auth @loggedIn="loggedIn">
    <SignIn :redirect="resultRedirect" />
  </Auth>
</template>

<script>
import Auth from '@/components/auth'
import SignIn from '@/components/sign-in/firebase-sign-in-ui'

import { createNamespacedHelpers } from 'vuex'
import { setTimeout } from 'timers'
const { mapState: mapStateAuth } = createNamespacedHelpers('auth')

export default {
  components: {
    Auth,
    SignIn
  },
  props: {
    redirect: {
      type: String,
      default: 'home'
    },
    id: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    resultRedirect: '/home'
  }),
  computed: {
    ...mapStateAuth(['isLoggedIn', 'uid', 'isAnonymous'])
  },
  created () {
    if (this.id === '' && this.home !== 'home') this.resultRedirect = `/${this.redirect}`
    if (this.id !== '' && this.home !== 'home') this.resultRedirect = `/${this.redirect}/${this.id}`
  },
  mounted () {
    setTimeout(() => {
      if (location.pathname.split('/')[1] === 'sign-up') {
        document.getElementsByClassName('firebaseui-title')[0].innerText = 'Sign Up with Email'
      }
    }, 100)
  },
  methods: {
    async loggedIn () {
      if (!this.isAnonymous) {
        this.$router.push(`${this.resultRedirect}`)
      }
    }
  }
}
</script>

<style>
</style>
