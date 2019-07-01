<template lang="pug">

div.wrap-module
  div(ref="bubbleWrap").wrap-bubbles.py12
    ItemChatBubble(v-for="item in messages" :message="item")
  div.wrap-input
    ItemChatInput(:group="group")

</template>

<style lang="scss" scoped>
.wrap-module {
  display: block;
  width: 100%;
  height: calc(100vh - 0px);
  background: #f8f8f8;
  padding-top: 48px;
  .wrap-bubbles {
    display: block;
    width: 90%;
    max-width: 480px;
    height: calc(100% - (60px + 36px));
    margin: 0 auto;
    overflow: scroll;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
  }
  .wrap-bubbles::-webkit-scrollbar {
    display: none;
  }
  .wrap-input {
    display: block;
    width: 100%;
    height: calc(60px + 36px);
  }
}
</style>

<script>

import { firestore } from '@/components/utils/firestore'

import { createNamespacedHelpers } from 'vuex'

import ItemChatInput from '@/components/items/ChatInput'
import ItemChatBubble from '@/components/items/ChatBubble'
const { mapState: mapStateAuth } = createNamespacedHelpers('auth')

export default {
  components: {
    ItemChatInput,
    ItemChatBubble
  },
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
      groupName: '',
      messages: []
    }
  },
  async created () {
    await firestore.collection('GROUP')
      .doc(this.group.id)
      .collection('MESSAGE')
      .orderBy('createdAt', 'asc')
      .onSnapshot(q => {
        this.messages = q.docs.map(d => {
          var message = d.data()
          message.id = d.id
          return message
        })
        this.scrollToBottom()
      })
  },
  methods: {
    scrollToBottom () {
      setTimeout(() => {
        if (this.$refs.bubbleWrap) this.$refs.bubbleWrap.scrollTop = this.$refs.bubbleWrap.scrollHeight
      }, 400)
    }
  }
}
</script>
