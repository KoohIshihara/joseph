<template>
  <SignIn :redirect="redirect"/>
</template>

<script>
import SignIn from '@/components/sign-in/firebase-sign-in-ui'
export default {
  components: {
    SignIn
  },
  props: {
    redirect: {
      type: String,
      default: '/'
    }
  }
}
</script>

<style>
</style>
