<template lang="pug">

div.wrap-item
  div.wrap-member-list-content.f.fm
    div.wrap-check-box.mr6
      v-checkbox(v-model="person.checkbox")
    div.wrap-icon.f.fh.mr12
      img(:src="person.icon")
    div.wrap-profile
      span.name {{person.name}}
      span(v-if="person.profile != ''").profile.line-clamp-1 {{person.profile}}
      span(v-else).profile.line-clamp-1 No Profile

</template>

<style lang="scss" scoped>
.wrap-item {
  width: 100%;
  height: 58px;
  border-bottom: solid 0.6px rgba(0, 0, 0, 0.2);
  .wrap-member-list-content {
    width: 90%;
    max-width: 480px;
    height: 100%;
    margin: 0 auto;
    .wrap-icon {
      display: block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: solid rgba(0, 0, 0, 0.2) 0.4px;
      overflow: hidden;
      img {
        min-width: 100%;
        min-height: 100%;
        object-fit: cover;
      }
    }
    .wrap-profile {
      width: calc(100% - 86px);
      .name {
        font-weight: bold;
        font-size: 16px;
      }
      .profile {
        color: #999;
        font-size: 12px;
      }
    }
  }
}
</style>

<script>

import { firestore } from '@/components/utils/firestore'

export default {
  props: {
    person: {
      type: Object,
      required: true
    }
  },
  created () {

  },
  methods: {
    toUserDetail () {
      console.log('toUserDetail')
    }
  }
}
</script>
