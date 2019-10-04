<template lang="pug">

div.wrap-module
  div(ref="bubbleWrap" :class="dviceStatus" :scroll="onscroll").wrap-bubbles.py12
    ItemChatBubble(v-for="item in messages" :message="item")
  div.wrap-input
    ItemChatInput(
      :group="group"
      :showNotification="showNotification"
      :notificationLabel="notificationLabel"
      :dviceStatus="dviceStatus"
      @hideNotification="hideNotification"
    )

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
    width: 95%;
    max-width: 480px;
    height: calc(100% - (60px + 36px));
    margin: 0 auto;
    overflow: scroll;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
  }
  .status-mobile {
    height: calc(100vh - 156px);
  }
  .status-mobile-safari {
    height: calc(100% - 216px);
  }
  .status-mobile-android {
    height: calc(100% - 216px);
  }
  .wrap-bubbles::-webkit-scrollbar {
    display: none;
  }
  .wrap-input {
    position: relative;
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
    ...mapStateAuth(['isLoggedIn', 'uid', 'isAnonymous'])
  },
  data () {
    return {
      groupName: '',
      messages: [],
      dviceStatus: '',
      isFirst: true,
      showNotification: false,
      notificationLabel: ''
    }
  },
  async created () {
    if (this.$device.mobile) {
      this.dviceStatus = 'status-mobile'
      // if (navigator.userAgent.indexOf('Safari') !== -1) {
      // if (window.safari !== undefined) {
      if (navigator.userAgent.search('Safari') >= 0 && navigator.userAgent.search('Chrome') < 0) {
        this.dviceStatus = 'status-mobile-safari'
      }
      if (navigator.userAgent.indexOf('Android') > 0) {
        this.dviceStatus = 'status-mobile-android'
      }
    }
  },
  mounted () {
    this.$refs.bubbleWrap.addEventListener('scroll', this.onscroll)

    firestore
      .collection('GROUP')
      .doc(this.group.id)
      .collection('MESSAGE')
      .orderBy('createdAt', 'asc')
      .onSnapshot(q => {
        const newMessages = q.docs.map(d => {
          var message = d.data()
          message.id = d.id
          return message
        })

        this.updateMessages(newMessages)
      })
  },
  methods: {
    scrollToBottom () {
      setTimeout(() => {
        if (this.$refs.bubbleWrap) {
          var bubbleWrap = this.$refs.bubbleWrap
          bubbleWrap.scrollTop = (bubbleWrap.scrollHeight - bubbleWrap.offsetHeight)
        }
      }, 800)
    },
    onscroll (e) {
      var bubbleWrap = this.$refs.bubbleWrap
      if (bubbleWrap.scrollTop === 0 && this.isAnonymous) {
        // スクロールするほどメッセージがある時
        if (bubbleWrap.offsetHeight < bubbleWrap.scrollHeight) {
          this.$emit('openrecomend')
        }
      }

      if (bubbleWrap.scrollTop === (bubbleWrap.scrollHeight - bubbleWrap.offsetHeight)) {
        console.log('hide')
        this.showNotification = false
      }
    },
    openRecomendSignUp () {
      // スクロールするほどメッセージがなくてアノニマスな時
      if (this.$refs.bubbleWrap.offsetHeight >= this.$refs.bubbleWrap.scrollHeight && this.isAnonymous) {
        setTimeout(() => {
          this.$emit('openrecomend')
        }, 8000)
      }
    },
    updateMessages (newMessages) {
      var bubbleWrap = this.$refs.bubbleWrap
      var maxScroll = bubbleWrap.scrollHeight - bubbleWrap.offsetHeight
      var isChatWrapBottom = (maxScroll === bubbleWrap.scrollTop) //! (bubbleWrap.scrollTop < (maxScroll - bubbleWrap.offsetHeight))

      if (this.isFirst) {
        // はじめのロードだった場合
        this.messages = newMessages
        this.scrollToBottom()
        this.isFirst = false
      } else if (newMessages.length === this.messages.length) {
        // Alike Unlikeによる更新だった場合
        console.log('on alike or unlike')
      } else if (!isChatWrapBottom) {
        // 上の方をみている時に新規メッセージがあった場合
        console.log('show notify of new message')
        this.messages = newMessages
        this.notificationLabel = newMessages[newMessages.length - 1].text
        this.showNotification = true
      } else if (isChatWrapBottom) {
        // 下にいる時で新規メッセージがあった場合
        this.messages = newMessages
        this.scrollToBottom()
      }
    },
    hideNotification () {
      this.showNotification = false
      if (this.$refs.bubbleWrap) {
        var bubbleWrap = this.$refs.bubbleWrap
        bubbleWrap.scrollTop = (bubbleWrap.scrollHeight - bubbleWrap.offsetHeight)
      }
    }
  }
}
</script>
