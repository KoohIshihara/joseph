<template lang="pug">

Auth(@loggedIn="loggedIn" @loginFailed="loginFailed").wrap-add-member
  Header(
    :headerContent="headerContent"
    @onLeft="back"
    @onRight="onAdd"
    )
  ModuleAddMember(ref="moduleAddMember")

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
import ModuleAddMember from '@/components/modules/AddMember'

import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateAuth } = createNamespacedHelpers('auth')

export default {
  components: {
    Auth,
    Header,
    ModuleAddMember
  },
  data () {
    return {
      headerContent: Object,
      letAlertForAnonymous: true
    }
  },
  computed: {
    ...mapStateAuth(['isLoggedIn', 'uid'])
  },
  created () {
    this.headerContent = {
      left: { icon: 'arrow_back_ios' },
      right: { label: 'Add' },
      center: { label: 'Select Persons to Group' }
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
    },
    onAdd () {
      this.$refs.moduleAddMember.addPersonsToGroup()
      mixpanel.track('AddMember: onAdd')
    }
  }
}
</script>
