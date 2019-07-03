<template lang="pug">

Auth(@loggedIn="loggedIn" @loginFailed="loginFailed")
  Header(
    :headerContent="headerContent"
    @onLeft="back"
    )
  CreateGroup

</template>

<style lang="scss" scoped>
.wrap-page {
  overflow: scroll;
  display: block;
  width: 100%;
  /*height: calc(100vh - 48px);*/
  height: 100vh;
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
}
</style>

<script>
import Auth from '@/components/auth'
import Header from '@/components/modules/Header'
import CreateGroup from '@/components/modules/CreateGroup'

import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateAuth } = createNamespacedHelpers('auth')

export default {
  components: {
    Auth,
    Header,
    CreateGroup
  },
  data () {
    return {
      headerContent: Object,
      letAlertForAnonymous: true
    }
  },
  computed: {
    ...mapStateAuth(['isLoggedIn', 'uid', 'isAnonymous'])
  },
  created () {
    this.headerContent = {
      left: {
        icon: 'arrow_back_ios'
      },
      right: {},
      center: { label: 'New Group' }
    }
  },
  mounted () {

  },
  methods: {
    async loggedIn () {
      console.log('authed')
      this.afterLoggedIn()
    },
    async loginFailed () {
      console.log('unauthed')
      this.afterLoggedIn()
      // alert('You need sign in or sign up to create a group')
      // this.$router.push(`/sign-in${location.pathname}`)
    },
    back () {
      this.$router.push(`/home`)
    },
    afterLoggedIn () {
      if ((this.isAnonymous && this.letAlertForAnonymous) || !this.isLoggedIn) {
        var answer = confirm('You need sign in or sign up to create a group. Sign Up/In?')
        if (answer) {
          this.$router.push(`/sign-in${location.pathname}`)
        } else {
          this.back()
        }
      }
    }
  }
}
</script>
