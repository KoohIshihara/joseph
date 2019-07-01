<template lang="pug">

div(v-if="person!=={}").wrap-item.mb12
  div.wrap-chat-bubble.f
    img(:class="active" :src="person.icon").icon.mr8
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
      border: solid 1px rgba(0, 0, 0, 0.2);

      transition: all 400ms ease-in;
      opacity: 0;
    }
    .text {
      background: #f0f0f0;
      color: #2a2a2a;
      border-radius: 6px;
      opacity: 0;

      transition: all 400ms ease-in;
      transform: translateY(8px);
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
