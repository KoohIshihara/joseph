<template>
  <Auth @loggedIn="loggedIn">
    <SignIn :redirect="redirect"/>
  </Auth>
</template>

<script>
import Auth from '@/components/auth'
import SignIn from '@/components/sign-in/firebase-sign-in-ui'

export default {
  components: {
    Auth,
    SignIn
  },
  props: {
    redirect: {
      type: String,
      default: '/'
    }
  },
  methods: {
    async loggedIn () {
      this.$router.push('/home')
    }
  }
}
</script>

<style>
</style>
