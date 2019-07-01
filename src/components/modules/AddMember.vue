<template lang="pug">

div.wrap-module
  div.wrap-add-member-content
    div(@click="toCreatePerson").wrap-to-create-member.f.fm
      div.to-create-member.f.fm
        v-icon.mr8 person_add
        span.pt2 Create a new person
    MemberCheckList(v-for="item in existingPersons" :person="item")

</template>

<style lang="scss" scoped>
.wrap-module {
  width: 100%;
  background: #f8f8f8;
  padding: 48px 0;

  overflow: scroll;
  display: block;
  min-height: 100vh;
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
  .wrap-add-member-content {
    width: 100%;
    margin: 0 auto;
    .wrap-to-create-member {
      width: 100%;
      height: 58px;
      border-bottom: solid 0.6px rgba(0, 0, 0, 0.2);
      cursor: pointer;
      .to-create-member {
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
import MemberCheckList from '@/components/items/MemberCheckList'

import { firestore } from '@/components/utils/firestore'

import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateAuth } = createNamespacedHelpers('auth')

export default {
  components: {
    MemberCheckList
  },
  computed: {
    ...mapStateAuth(['isLoggedIn', 'uid'])
  },
  data () {
    return {
      groupName: '',
      existingPersons: []
    }
  },
  async created () {
    this.existingPersons = await firestore.collection('PERSON')
      .get()
      .then((q) => {
        var persons = q.docs.filter((d) => {
          var letReturn = true
          var groups = d.data().groups
          for (var i = 0; i < groups.length; i++) {
            if (groups[i] === this.$route.params.group_id) letReturn = false
          }
          return (letReturn)
        })

        return persons.map((e) => {
          var personList = e.data()
          personList.checkbox = false
          personList.uid = e.id
          return personList
        })
      })
  },
  methods: {
    toCreatePerson () {
      this.$router.push(`/person/new/${this.$route.params.group_id}`)
    },
    async addPersonsToGroup () {
      var selectedUsers = this.existingPersons.filter((e) => {
        return e.checkbox
      })

      // push groupId to selected persons via custom API
      console.log('selectedUsers', selectedUsers)

      // const pushGroupIdToUsersURI = 'http://localhost:5000/joseph-alike/us-central1/pushGroupIdToUsers'
      const pushGroupIdToUsersURI = 'https://us-central1-joseph-alike.cloudfunctions.net/pushGroupIdToUsers'
      const response = await fetch(pushGroupIdToUsersURI, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          'groupId': this.$route.params.group_id,
          'selectedUsers': selectedUsers
        })
      })

      var result = await response.json()

      console.log('result:', result)

      this.$router.push(`/group_member/${this.$route.params.group_id}`)
    }
  }
}
</script>
