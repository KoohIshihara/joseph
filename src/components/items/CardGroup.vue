<template lang="pug">

div(@click="toChat").wrap-item.py10
  div.wrap-card-group
    span.name.mb8 {{group.name}}
    span.latest-message.line-clamp-1.mb8 {{latestMessage}}
    div(v-if="persons[0]").wrap-persons.f
      div(v-for="item in persons").wrap-icon.mr8
        img(:src="item.icon")
    div(v-if="persons[0]==undefined")
      span No Member

</template>

<style lang="scss" scoped>
.wrap-item {
  width: 100%;
  background: #fff;
  border-bottom: solid 0.6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  .wrap-card-group {
    width: 90%;
    max-width: 480px;
    margin: 0 auto;
    .name {
      font-size: 18px;
      color: #2a2a2a;
    }
    .latest-message {
      color: #999;
      min-height: 21px;
    }
    .wrap-persons {
      .wrap-icon {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        overflow: hidden;
        img {
          object-fit: cover;
          height: 100%;
        }
      }
    }
  }
}
</style>

<script>

import { firestore } from '@/components/utils/firestore'

export default {
  props: {
    group: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      latestMessage: '',
      persons: []
    }
  },
  async created () {
    this.persons = await firestore
      .collection('PERSON')
      .where('groups', 'array-contains', this.group.id)
      .get()
      .then(q => {
        return q.docs.map(d => {
          var person = d.data()
          person.id = d.id
          return person
        })
      })

    var latestMessageObj = await firestore
      .collection('GROUP')
      .doc(this.group.id)
      .collection('MESSAGE')
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get()
      .then(q => {
        if (q.docs[0]) return q.docs[0].data()
      })
    if (latestMessageObj) {
      const latestMessagePerson = this.persons.filter(e => {
        return (e.id === latestMessageObj.postedAs)
      })[0]

      this.latestMessage = `${latestMessagePerson.name}: ${latestMessageObj.text}`
    }
  },
  methods: {
    toChat () {
      this.$router.push(`/chat/${this.group.id}`)
    }
  }
}
</script>
