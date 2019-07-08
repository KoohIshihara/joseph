<template lang="pug">

div.wrap-module.f.fh
  div.wrap-create-group-content.pt12
    v-flex(xs12 sm6 md3)
      v-text-field(label="Input Group Name" v-model="groupName")
    div.f.fc.mt12
      CustomButton(@onbutton="createGroup" :label="label")

</template>

<style lang="scss" scoped>
.wrap-module {
  width: 100%;
  height: 100%;
  background: #f8f8f8;
  padding: 48px 0;

  overflow: scroll;
  min-height: 100vh;
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
  .wrap-create-group-content {
    width: 90%;
    max-width: 480px;
    height: 100%;
    margin: 0 auto;
  }
}
</style>

<script>
import CustomButton from '@/components/items/CustomButton'

import { firestore } from '@/components/utils/firestore'

import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateAuth } = createNamespacedHelpers('auth')

export default {
  components: {
    CustomButton
  },
  computed: {
    ...mapStateAuth(['isLoggedIn', 'uid'])
  },
  data () {
    return {
      label: 'Create Group',
      groupName: ''
    }
  },
  created () {

  },
  methods: {
    async createGroup () {
      if (this.groupName === '') alert('Please input Group Name')

      var groupObj = {
        name: this.groupName,
        createdBy: this.uid,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'public'
      }
      var groupDoc = await firestore.collection('GROUP').add(groupObj)

      this.$router.push(`add_member/${groupDoc.id}`)

      mixpanel.track(`ModuleCreateGroup: createGroup (${this.groupName})`)
    }
  }
}
</script>
