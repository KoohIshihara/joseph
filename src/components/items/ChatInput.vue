<template lang="pug">

div.wrap-item
  div(v-if="persons[0]").wrap-person-selector.py2
    span.pb2 {{`Curent User : ${currentPerson.name}`}}
    div.wrap-icons.f.fm.pl4
      img(
        v-for="item in persons"
        :src="item.icon"
        :class="item.status"
        @click="changePerson(item)"
        ).mr8
  div.wrap-input.f.fm
    textarea(placeholder="message" v-model="message").px6.mr8
    div.wrap-icon.f.fh
      v-icon(@click="sendMessage") send

</template>

<style lang="scss" scoped>
.wrap-item {
  width: 100%;
  height: 100%;
  border-top: solid 0.6px rgba(0, 0, 0, 0.2);
  .wrap-person-selector {
    width: 94%;
    max-width: 480px;
    height: 60px;
    margin: 0 auto;
    @media screen and (max-width: 480px) {
      width: 97%;
      max-width: 480px;
      margin-left: 3%;
    }
    span {
      font-size: 12px;
      font-weight: bold;
    }
    .wrap-icons {
      height: 38px;
      overflow-x: scroll;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      overflow-scrolling: touch;
      img {
        display: block;
        object-fit: cover;
        height: 100%;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: solid 1px rgba(0, 0, 0, 0.1);
        transition: all 200ms ease-in;
      }
      .hacked {
        border: solid 2px #03a9f4 !important;
        transform: scale(1.1) !important;
      }
    }
    .wrap-icons::-webkit-scrollbar {
      display: none;
    }
  }

  .wrap-input {
    width: 94%;
    max-width: 480px;
    height: 36px;
    margin: 0 auto;
    textarea {
      width: calc(100% - 24px);
      height: 24px;
      border: solid 0.6px rgba(0, 0, 0, 0.1);
      outline: none;
      background: #f0f0f0;
      border-radius: 8px;
      resize: none;
    }
    .wrap-icon {
      i {
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>

<script>

import { firestore } from '@/components/utils/firestore'

import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateAuth } = createNamespacedHelpers('auth')

export default {
  props: {
    group: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapStateAuth(['isLoggedIn', 'uid'])
  },
  data () {
    return {
      message: '',
      persons: [],
      currentPerson: {}
    }
  },
  async created () {
    this.persons = await firestore.collection('PERSON')
      .where('groups', 'array-contains', this.$route.params.group_id)
      .get()
      .then((q) => {
        return q.docs.map((d) => {
          var person = d.data()
          person.id = d.id
          person.status = 'un-hacked'
          return person
        })
      })
    this.persons[0].status = 'hacked'
    this.currentPerson = this.persons[0]

    // for test
    // this.persons = this.persons.concat(this.persons)
  },
  methods: {
    async sendMessage () {
      console.log('sendMessage')
      if (this.message === '') return
      const messageObj = {
        author: this.uid,
        text: this.message,
        postedAs: this.currentPerson.id,
        createdAt: new Date()
      }
      const messageDoc = await firestore.collection('GROUP')
        .doc(this.$route.params.group_id)
        .collection('MESSAGE')
        .add(messageObj)
      messageObj.id = messageDoc.id
      // this.$emit('pushMessage', messageObj)
      this.message = ''
    },
    changePerson (targetPerson) {
      this.currentPerson.status = 'un-hacked'

      this.currentPerson = this.persons.filter((e) => {
        return (e.id === targetPerson.id)
      })[0]

      this.currentPerson.status = 'hacked'
    }
  }
}
</script>
