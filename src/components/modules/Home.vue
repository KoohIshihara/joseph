<template lang="pug">

div(:class="dviceStatus").wrap-module
  CardGroup(v-for="item in groups" :group="item")

</template>

<style lang="scss" scoped>
.wrap-module {
  display: block;
  width: 100%;
  height: calc(100vh - (48px + 48px));
  background: #f8f8f8;
  padding-top: 48px;
  overflow: scroll;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
}
.status-mobile {
  height: calc(100vh - 20px);
}
.status-mobile-safari {
  height: calc(100vh - 166px);
}
</style>

<script>

import { firestore } from '@/components/utils/firestore'

import { createNamespacedHelpers } from 'vuex'

import CardGroup from '@/components/items/CardGroup'
const { mapState: mapStateAuth } = createNamespacedHelpers('auth')

export default {
  components: {
    CardGroup
  },
  computed: {
    ...mapStateAuth(['isLoggedIn', 'uid'])
  },
  data () {
    return {
      groups: [],
      dviceStatus: ''
    }
  },
  async created () {
    if (this.$device.mobile) {
      this.dviceStatus = 'status-mobile'
      if (navigator.userAgent.indexOf('Safari') !== -1) {
        this.dviceStatus = 'status-mobile-safari'
      }
    }

    this.groups = await firestore
      .collection('GROUP')
      // .where('groups', 'array-contains', this.uid)
      .orderBy('createdAt', 'desc')
      .get()
      .then(q => {
        return q.docs.map(d => {
          var groups = d.data()
          groups.id = d.id
          return groups
        })
      })
  }
}
</script>
