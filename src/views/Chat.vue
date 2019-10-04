<template lang="pug">

Auth(@loggedIn="loggedIn" @loginFailed="loginFailed").wrap-home
  Header(
    :headerContent="headerContent"
    v-if="isObject(headerContent)"
    @onLeft="toHome"
    @onRight="toMember"
    )
  ModuleChat(:group="group" v-if="isObject(headerContent)" @openrecomend="toggleShowRecomendSignUp" ref="moduleChat")
  //ModuleTutorial(v-if="showTutorial" @closetutorial="closetutorial")
  //ModuleRecomendSignUp(v-if="showRecomendSignUp" @closerecomend="toggleShowRecomendSignUp")

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
import ModuleChat from '@/components/modules/Chat'
import ModuleTutorial from '@/components/modules/Tutorial'
import ModuleRecomendSignUp from '@/components/modules/RecomendSignUp'

import { firebase } from '@/components/utils/firebase'
import { firestore } from '@/components/utils/firestore'

import { createNamespacedHelpers } from 'vuex'
import { setTimeout } from 'timers'
const { mapState: mapStateAuth } = createNamespacedHelpers('auth')

export default {
  components: {
    Auth,
    Header,
    ModuleChat,
    ModuleTutorial,
    ModuleRecomendSignUp
  },
  data: () => ({
    group: Object,
    headerContent: Object,
    showTutorial: false,
    showRecomendSignUp: false
  }),
  computed: {
    ...mapStateAuth(['isLoggedIn', 'uid', 'isAnonymous'])
  },
  async created () {
    this.group = await firestore.collection('GROUP')
      .doc(this.$route.params.group_id)
      .get()
      .then((d) => {
        const group = d.data()
        group.id = d.id
        return group
      })

    this.headerContent = {
      left: { icon: 'arrow_back_ios' },
      right: { icon: 'group_add' },
      center: { label: this.group.name }
    }

    if (this.isAnonymous) this.headerContent.right = { label: 'Sign Up' }

    if (this.isAnonymous) {
      console.log('isAnonymous')
      setTimeout(() => {
        this.showTutorial = true
      }, 1200)
    }
  },
  methods: {
    async loggedIn () {
      console.log('authed')
    },
    async loginFailed () {
      console.log('unauthed')
      firebase.auth().signInAnonymously().catch(function (error) {
        // Handle Errors here.
        // eslint-disable-next-line
        console.error('Login anonymously error: ', error)
        // ...
      })
    },
    isObject (obj) {
      return Object.prototype.toString.call(obj) === '[object Object]'
    },
    toHome () {
      this.$router.push(`/home`)
    },
    toMember () {
      if (this.isAnonymous) {
        // this.$router.push(`/sign-up${this.$route.path}`)
        mixpanel.track('Chat: sign up on header (isAnonymous)')
      } else {
        // this.$router.push(`/group_member/${this.$route.params.group_id}`)
        mixpanel.track('Chat: toGroupMember')
      }
    },
    closetutorial () {
      this.showTutorial = false
      this.$refs.moduleChat.openRecomendSignUp()
    },
    toggleShowRecomendSignUp () {
      this.showRecomendSignUp = !this.showRecomendSignUp
    }
  }
}
</script>
