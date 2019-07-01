<template lang="pug">

Auth(@loggedIn="loggedIn" @loginFailed="loginFailed").wrap-home
  Header(
    :headerContent="headerContent"
    v-if="isObject(headerContent)"
    @onLeft="back"
    @onRight="toChat"
    )
  ModuleGroupMember(:group="group" v-if="isObject(group)" )

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
import ModuleGroupMember from '@/components/modules/GroupMember'

import { firestore } from '@/components/utils/firestore'

import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateAuth } = createNamespacedHelpers('auth')

export default {
  components: {
    Auth,
    Header,
    ModuleGroupMember
  },
  data: () => ({
    group: Object,
    headerContent: Object
  }),
  computed: {
    ...mapStateAuth(['isLoggedIn', 'uid'])
  },
  async created () {
    this.group = await firestore.collection('GROUP')
      .doc(this.$route.params.group_id)
      .get()
      .then((d) => {
        return d.data()
      })

    this.headerContent = {
      left: { icon: 'arrow_back_ios' },
      right: { label: 'OK' },
      center: { label: this.group.name }
    }
  },
  methods: {
    async loggedIn () {
      console.log('authed')
    },
    async loginFailed () {
      console.log('unauthed')
    },
    isObject (obj) {
      return Object.prototype.toString.call(obj) === '[object Object]'
    },
    back () {
      this.$router.back()
    },
    toChat () {
      this.$router.push(`/chat/${this.$route.params.group_id}`)
    }
  }
}
</script>
