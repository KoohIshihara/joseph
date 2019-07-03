<template lang="pug">

div.wrap-item.mb12.f
  div.wrap-chat-bubble.flex-bottom.mr8
    img(:class="active" :src="person.icon").icon.mr8
    div.wrap-text
      span.name.mb4 {{person.name}}
      span(:class="active").text.px8.py4 {{message.text}}
  div.wrap-alike-unlike.f.fb
    div(:class="active").alike-unlike.f.flex-wrap
      span(@click="addAlike" :class="alikeStatus").px4.py2.mt4.mr6 {{`Alike ${message.alikeNum}`}}
      span(@click="addUnlike" :class="unlikeStatus").px4.py2.mt4 {{`Unlike ${message.unlikeNum}`}}

</template>

<style lang="scss" scoped>
.wrap-item {
  .wrap-chat-bubble {
    display: inline-flex;
    max-width: 80%;
    .icon {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      /*border: solid 1px rgba(0, 0, 0, 0.2);*/

      transition: all 400ms ease-in;
      opacity: 0;
    }
    .wrap-text {
      .name {
        display: block;
        font-size: 12px;
        color: #999;
      }
      .text {
        display: inline-block;
        background: #f0f0f0;
        color: #2a2a2a;
        font-size: 15px;
        border-radius: 6px;
        opacity: 0;

        transition: all 400ms ease-in;
        transform: translateY(8px);
      }
    }
    .active {
      opacity: 1 !important;
      transform: translateY(0px) !important;
    }
  }
  .wrap-alike-unlike {
    /*display: block;*/
    .alike-unlike {
      max-height: 58px;
      transition: all 400ms ease-in;
      transform: translateY(8px);
      opacity: 0;
      span {
        display: block;
        height: 24px;
        font-size: 12px;
        color: #2a2a2a;
        cursor: pointer;
        border: solid 1px rgba(0, 0, 0, 0.4);
        border-radius: 6px;
      }
      .posted {
        background: #2a2a2a;
        color: #fff;
      }
    }
    .active {
      opacity: 1 !important;
      transform: translateY(1px) !important;
    }
  }
}
</style>

<script>
import { firebase } from '@/components/utils/firebase'
import { firestore } from '@/components/utils/firestore'

import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateAuth } = createNamespacedHelpers('auth')

export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapStateAuth(['isLoggedIn', 'uid'])
  },
  data () {
    return {
      active: 'un-active',
      person: {},
      alikes: [],
      unlikes: [],
      alikeStatus: 'un-poted',
      unlikeStatus: 'un-poted'
    }
  },
  async created () {
    if (this.message.alikes.indexOf(this.uid) >= 0) this.alikeStatus = 'posted'
    if (this.message.unlikes.indexOf(this.uid) >= 0) this.unlikeStatus = 'posted'

    this.person = await firestore
      .collection('PERSON')
      .doc(this.message.postedAs)
      .get()
      .then(e => {
        return e.data()
      })
  },
  mounted () {
    setTimeout(() => {
      this.active = 'active'
    }, 400)
  },
  methods: {
    async addAlike () {
      if (this.alikeStatus === 'posted') return
      this.alikeStatus = 'posted'

      const messageRef = firestore.collection('GROUP')
        .doc(this.$route.params.group_id)
        .collection('MESSAGE')
        .doc(this.message.id)

      messageRef.update({ alikes: firebase.firestore.FieldValue.arrayUnion(this.uid) })
      messageRef.update({ alikeNum: firebase.firestore.FieldValue.increment(1) })
    },
    async addUnlike () {
      if (this.unlikeStatus === 'posted') return
      this.unlikeStatus = 'posted'

      const messageRef = firestore.collection('GROUP')
        .doc(this.$route.params.group_id)
        .collection('MESSAGE')
        .doc(this.message.id)

      messageRef.update({ unlikes: firebase.firestore.FieldValue.arrayUnion(this.uid) })
      messageRef.update({ unlikeNum: firebase.firestore.FieldValue.increment(1) })
    }
  }
}
</script>
