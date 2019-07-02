<template lang="pug">

div.wrap-item.mb12
  div.wrap-chat-bubble.f.flex-bottom
    img(:class="active" :src="person.icon").icon.mr8
    div.wrap-text
      span.name.mb4 {{person.name}}
      span(:class="active").text.px8.py4 {{message.text}}

</template>

<style lang="scss" scoped>
.wrap-item {
  .wrap-chat-bubble {
    width: 80%;
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
}
</style>

<script>

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
      unlikes: []
    }
  },
  async created () {
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
  }
}
</script>
