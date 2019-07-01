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
      headerContent: Object
    }
  },
  computed: {
    ...mapStateAuth(['isLoggedIn', 'uid'])
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
  methods: {
    async loggedIn () {
      console.log('authed')
    },
    async loginFailed () {
      console.log('unauthed')
    },
    back () {
      this.$router.back()
    }
  }
}
</script>
