<template lang="pug">

div.wrap-module
  div.wrap-group-member-content
    div(@click="toAddMember").wrap-to-add-member.f.fm
      div.to-add-member.f.fm
        v-icon.mr8 add
        span.pt2 Add persons
    // MemberList(:uid="$route.params.group_id")
    MemberList(v-for="item in groupPersons" :person="item")

</template>

<style lang="scss" scoped>
.wrap-module {
  width: 100%;
  background: #fff;
  padding: 48px 0;

  overflow: scroll;
  display: block;
  min-height: 100vh;
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
  .wrap-group-member-content {
    width: 100%;
    margin: 0 auto;
    .wrap-to-add-member {
      width: 100%;
      height: 48px;
      border-bottom: solid 0.6px rgba(0, 0, 0, 0.2);
      cursor: pointer;
      .to-add-member {
        width: 90%;
        max-width: 480px;
        margin: 0 auto;
        i {
          color: #2a2a2a;
        }
      }
    }
  }
}
</style>

<script>
import MemberList from '@/components/items/MemberList'

import { firestore } from '@/components/utils/firestore'

import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateAuth } = createNamespacedHelpers('auth')

export default {
  components: {
    MemberList
  },
  computed: {
    ...mapStateAuth(['isLoggedIn', 'uid'])
  },
  props: {
    group: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      label: 'Next',
      groupName: '',
      groupPersons: []
    }
  },
  async created () {
    this.groupPersons = await firestore
      .collection('PERSON')
      .where('groups', 'array-contains', this.$route.params.group_id)
      .get()
      .then((q) => {
        return q.docs.map((d) => {
          return d.data()
        })
      })
  },
  methods: {
    async addMember () {
      console.log('addMember')
    },
    toAddMember () {
      this.$router.push(`/add_member/${this.$route.params.group_id}`)
      mixpanel.track('GroupMember: toAddMember')
    }
  }
}
</script>
